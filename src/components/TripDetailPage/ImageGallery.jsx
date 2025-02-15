import React, { useEffect, useState, useRef } from "react";
import { getPlaceImages } from "../../network/networkCalls";
import TripImageCarousel from "./TripImageCarousel";
import ImageGalleryModal from "./ImageGalleryModal";
import { ImageGallerySkeleton } from "../ui/LoadingSkeleton";
import { useSelector, useDispatch } from "react-redux";
import {
  cachePlaceImages,
  setInitialFetchDonePlaceImages,
} from "../../action/otherAction";

const ImageGallery = ({ placeName }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);

  const mainTripImagesCache = useSelector(
    (state) => state.pageURL.mainTripImagesCache
  );
  const initialFetchDoneImages = false;
  const dispatch = useDispatch();
  const handleLoadMore = () => {
    console.log("Load more images");
    if (hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await getPlaceImages(placeName, currentPage);
        setImages((prevImages) => [...prevImages, ...response.photos]);
        setHasMore(currentPage < response.pagination.totalPages);
        dispatch(setInitialFetchDonePlaceImages(true));
        dispatch(
          cachePlaceImages({
            data: response.photos,
            params: {
              placeName,
              page: currentPage,
            },
          })
        );
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!initialFetchDoneImages) {
      fetchImages();
    } else if (mainTripImagesCache && mainTripImagesCache.params) {
      const { placeName: cachedPlaceName, page: cachedPage } =
        mainTripImagesCache.params;
      const currentParams = {
        placeName,
        page: currentPage,
      };

      if (
        cachedPlaceName === currentParams.placeName &&
        cachedPage === currentParams.page
      ) {
        setImages(mainTripImagesCache.data);
        setLoading(false);
      } else {
        fetchImages();
      }
    }
  }, [
    placeName,
    currentPage,
    initialFetchDoneImages,
    mainTripImagesCache,
    dispatch,
  ]);

  console.log(
    "initialFetchDoneImages",
    initialFetchDoneImages,
    mainTripImagesCache
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [hasMore]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (loading && images.length === 0) {
    return <ImageGallerySkeleton />;
  }

  return (
    <div className="image-gallery">
      <div className="carousel-container">
        <TripImageCarousel images={images} onOpenGallery={openModal} />
      </div>
      <div ref={loader} style={{ height: "20px" }}></div>
      <ImageGalleryModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        images={images.map((image, index) => ({
          id: index + 1,
          url: image,
          alt: `${placeName} ${index + 1}`,
        }))}
        onLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default ImageGallery;
