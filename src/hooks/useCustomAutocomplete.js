import { useEffect } from "react";

export const useCustomAutocomplete = (inputRef, onSelect, isLoaded) => {
  useEffect(() => {
    if (!isLoaded || !inputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["(cities)"],
        componentRestrictions: { country: "in" },
        fields: ["formatted_address", "geometry", "name"],
      }
    );

    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      .pac-container {
      
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 16px 24px;
gap: 10px; 
background: #FFFFFF;
border-radius: 12px; 
box-shadow: none; 
border: 1px solid #989898; 
      }
      .pac-item { 
        cursor: pointer;
        display: flex; 
        align-items: flex-start;
        gap: 10px; 
        width:100%;
        margin-bottom: 0px;
        padding-bottom:0px;
      }
      .pac-item:hover {
        background-color: #F7EFE7;
        box-shadow: none;
      }
      .pac-item-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 12px;
      }
      .pac-item-name {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
        letter-spacing: -0.04em;
        color: #2E2B36;
      }
      .pac-item-location {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        text-align: center;
        letter-spacing: -0.04em;
        color: #818181;
      }
      .pac-icon-container {
        width: 28px;
        height: 28px;
        flex: none;
        order: 0;
        flex-grow: 0;
      }
      .pac-icon-container svg {
        position: absolute;
        width: 28px;
        height: 28px;
        left: 0px;
        top: 0px;
        background: #F7EFE7;
      }
      .pac-icon-container svg path {
        fill: #818181;
      }
    `;
    document.head.appendChild(styleSheet);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        onSelect(place.formatted_address);
      }
    });

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, [isLoaded, inputRef, onSelect]);
};
