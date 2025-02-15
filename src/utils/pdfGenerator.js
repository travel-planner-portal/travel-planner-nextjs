const generateTransportContent = (routeData) => {
  if (!routeData?.routes) return "";
  const { bus, train, flight } = routeData.routes;

  return `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px;">
      ${
        bus && bus.stops && bus.stops.length >= 2
          ? `
        <div style="background: linear-gradient(to bottom right, #FFFFFF, #F8F9FA); border-radius: 12px; padding: 25px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
          <div style="display: flex; align-items: center; margin-bottom: 15px;">
            <span style="background: #88B537; padding: 8px; border-radius: 8px; margin-right: 12px;">
              🚌
            </span>
            <h3 style="margin: 0; color: #2E2B36; font-size: 20px;">Bus Travel</h3>
          </div>
          <div style="color: #4A4A4A; line-height: 1.6;">
            <p style="margin: 8px 0;"><strong>From:</strong> ${
              bus.stops[0]?.location || "N/A"
            }</p>
            <p style="margin: 8px 0;"><strong>To:</strong> ${
              bus.stops[1]?.location || "N/A"
            }</p>
            <p style="margin: 8px 0;"><strong>Duration:</strong> ${
              bus.averageTime || "N/A"
            }</p>
            <p style="margin: 8px 0;"><strong>Fare:</strong> ${
              bus.fare || "N/A"
            }</p>
          </div>
        </div>
      `
          : ""
      }
      
      ${
        train && train.stops && train.stops.length >= 2
          ? `
        <div style="background: linear-gradient(to bottom right, #FFFFFF, #F8F9FA); border-radius: 12px; padding: 25px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
          <div style="display: flex; align-items: center; margin-bottom: 15px;">
            <span style="background: #88B537; padding: 8px; border-radius: 8px; margin-right: 12px;">
              🚂
            </span>
            <h3 style="margin: 0; color: #2E2B36; font-size: 20px;">Train Travel</h3>
          </div>
          <div style="color: #4A4A4A; line-height: 1.6;">
            <p style="margin: 8px 0;"><strong>From:</strong> ${
              train.stops[0]?.location || "N/A"
            }</p>
            <p style="margin: 8px 0;"><strong>To:</strong> ${
              train.stops[1]?.location || "N/A"
            }</p>
            <p style="margin: 8px 0;"><strong>Duration:</strong> ${
              train.averageTime || "N/A"
            }</p>
            ${
              train.fare
                ? `
            <div style="margin: 12px 0;">
              <p style="margin: 4px 0;"><strong>Fares:</strong></p>
              <ul style="list-style: none; padding-left: 15px; margin: 8px 0;">
                <li style="margin: 4px 0;">• Sleeper: ${
                  train.fare.sleeper || "N/A"
                }</li>
                <li style="margin: 4px 0;">• AC 3-Tier: ${
                  train.fare.ac3tier || "N/A"
                }</li>
                <li style="margin: 4px 0;">• AC 2-Tier: ${
                  train.fare.ac2tier || "N/A"
                }</li>
              </ul>
            </div>
            `
                : ""
            }
          </div>
        </div>
      `
          : ""
      }
      
      ${
        flight && flight.stops && flight.stops.length >= 2
          ? `
        <div style="background: linear-gradient(to bottom right, #FFFFFF, #F8F9FA); border-radius: 12px; padding: 25px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
          <div style="display: flex; align-items: center; margin-bottom: 15px;">
            <span style="background: #88B537; padding: 8px; border-radius: 8px; margin-right: 12px;">
              ✈️
            </span>
            <h3 style="margin: 0; color: #2E2B36; font-size: 20px;">Flight Travel</h3>
          </div>
          <div style="color: #4A4A4A; line-height: 1.6;">
            <p style="margin: 8px 0;"><strong>From:</strong> ${
              flight.stops[0]?.location || "N/A"
            }</p>
            <p style="margin: 8px 0;"><strong>To:</strong> ${
              flight.stops[1]?.location || "N/A"
            }</p>
            <p style="margin: 8px 0;"><strong>Duration:</strong> ${
              flight.averageTime || "N/A"
            }</p>
            ${
              flight.fare
                ? `
            <div style="margin: 12px 0;">
              <p style="margin: 4px 0;"><strong>Fares:</strong></p>
              <ul style="list-style: none; padding-left: 15px; margin: 8px 0;">
                <li style="margin: 4px 0;">• Economy: ${
                  flight.fare.economy || "N/A"
                }</li>
                <li style="margin: 4px 0;">• Business: ${
                  flight.fare.business || "N/A"
                }</li>
              </ul>
            </div>
            `
                : ""
            }
          </div>
        </div>
      `
          : ""
      }
    </div>
  `;
};

const generateStationsContent = (nearestStations) => {
  if (!nearestStations) return "";

  const { railway, airport, bus } = nearestStations;

  return `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
      ${
        railway
          ? `
        <div style="background: linear-gradient(to bottom right, #FFFFFF, #F8F9FA); border-radius: 12px; padding: 25px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
          <div style="display: flex; align-items: center; margin-bottom: 15px;">
            <span style="background: #88B537; padding: 8px; border-radius: 8px; margin-right: 12px;">
              🚂
            </span>
            <h3 style="margin: 0; color: #2E2B36; font-size: 20px;">Railway Station</h3>
          </div>
          <p style="margin: 0; color: #2E2B36; font-size: 16px; font-weight: 500;">${
            railway.name || "N/A"
          }</p>
          <p style="margin: 5px 0 0 0; color: #666;">${
            railway.distance || "N/A"
          }</p>
        </div>
      `
          : ""
      }
      
      ${
        airport
          ? `
        <div style="background: linear-gradient(to bottom right, #FFFFFF, #F8F9FA); border-radius: 12px; padding: 25px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
          <div style="display: flex; align-items: center; margin-bottom: 15px;">
            <span style="background: #88B537; padding: 8px; border-radius: 8px; margin-right: 12px;">
              ✈️
            </span>
            <h3 style="margin: 0; color: #2E2B36; font-size: 20px;">Airport</h3>
          </div>
          <p style="margin: 0; color: #2E2B36; font-size: 16px; font-weight: 500;">${
            airport.name || "N/A"
          }</p>
          <p style="margin: 5px 0 0 0; color: #666;">${
            airport.distance || "N/A"
          }</p>
        </div>
      `
          : ""
      }
      
      ${
        bus
          ? `
        <div style="background: linear-gradient(to bottom right, #FFFFFF, #F8F9FA); border-radius: 12px; padding: 25px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
          <div style="display: flex; align-items: center; margin-bottom: 15px;">
            <span style="background: #88B537; padding: 8px; border-radius: 8px; margin-right: 12px;">
              🚌
            </span>
            <h3 style="margin: 0; color: #2E2B36; font-size: 20px;">Bus Station</h3>
          </div>
          <p style="margin: 0; color: #2E2B36; font-size: 16px; font-weight: 500;">${
            bus.name || "N/A"
          }</p>
          <p style="margin: 5px 0 0 0; color: #666;">${
            bus.distance || "N/A"
          }</p>
        </div>
      `
          : ""
      }
    </div>
  `;
};

const generateItineraryDayContent = (day) => {
  if (!day) return "";

  const activities = day.activities || [];
  return `
    <div style="margin-bottom: 40px;">
      <div style="background: linear-gradient(to right, #88B537, #A8D957); padding: 20px; border-radius: 12px; margin-bottom: 25px; color: white;">
        <h3 style="margin: 0; font-size: 24px;">Day ${day.day}: ${
    day.title
  }</h3>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">${day.description}</p>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 15px;">
        ${activities
          .map(
            (activity) => `
          <div style="background: linear-gradient(to bottom right, #FFFFFF, #F8F9FA); border-radius: 12px; padding: 25px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <h4 style="margin: 0; color: #2E2B36; font-size: 18px;">${
                activity.name || ""
              }</h4>
              <span style="background: #88B537; color: white; padding: 6px 12px; border-radius: 20px; font-size: 14px;">
                ${activity.time || ""}
              </span>
            </div>
            ${
              activity.description
                ? `
              <p style="margin: 12px 0; color: #4A4A4A; line-height: 1.6;">
                ${activity.description}
              </p>
            `
                : ""
            }
            ${
              activity.location
                ? `
              <div style="display: flex; align-items: center; margin-top: 12px; color: #88B537;">
                <span style="margin-right: 8px;">📍</span>
                <span style="font-size: 14px;">${activity.location}</span>
              </div>
            `
                : ""
            }
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;
};

const generateAdditionalInfo = (itineraryData) => {
  const { additionalInfo } = itineraryData;
  if (!additionalInfo) return "";

  return `
    <div style="margin-bottom: 40px;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
        ${
          additionalInfo.mustTry
            ? `
          <div style="background: linear-gradient(to bottom right, #FFFFFF, #F8F9FA); border-radius: 12px; padding: 25px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
              <span style="background: #88B537; padding: 8px; border-radius: 8px; margin-right: 12px;">
                🍽️
              </span>
              <h3 style="margin: 0; color: #2E2B36; font-size: 20px;">Local Experiences</h3>
            </div>
            <ul style="margin: 0; padding-left: 20px; color: #4A4A4A; line-height: 1.6;">
              ${additionalInfo.mustTry
                .map(
                  (item) => `
                <li style="margin-bottom: 12px;">${item}</li>
              `
                )
                .join("")}
            </ul>
          </div>
        `
            : ""
        }
        
        ${
          additionalInfo.tips
            ? `
          <div style="background: linear-gradient(to bottom right, #FFFFFF, #F8F9FA); border-radius: 12px; padding: 25px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
              <span style="background: #88B537; padding: 8px; border-radius: 8px; margin-right: 12px;">
                💡
              </span>
              <h3 style="margin: 0; color: #2E2B36; font-size: 20px;">Travel Tips</h3>
            </div>
            <ul style="margin: 0; padding-left: 20px; color: #4A4A4A; line-height: 1.6;">
              ${additionalInfo.tips
                .map(
                  (tip) => `
                <li style="margin-bottom: 12px;">${tip}</li>
              `
                )
                .join("")}
            </ul>
          </div>
        `
            : ""
        }
      </div>
    </div>
  `;
};

export const generatePdfContent = (
  destination,
  duration,
  itineraryData,
  routeData
) => {
  if (!destination || !duration || !itineraryData || !routeData) {
    console.error("Missing required data for PDF generation");
    return "";
  }

  return `
    <div style="font-family: 'Helvetica', 'Arial', sans-serif; max-width: 800px; margin: 0 auto; padding: 40px 20px;">
      <!-- Cover Header -->
      <div style="text-align: center; margin-bottom: 50px; padding: 40px; background: linear-gradient(135deg, #88B537 0%, #A8D957 100%); border-radius: 16px; color: white;">
        <h1 style="margin: 0 0 10px 0; font-size: 36px; letter-spacing: -0.5px;">${destination}</h1>
        <p style="margin: 0; font-size: 20px; opacity: 0.9;">${duration} Days Itinerary</p>
        ${
          itineraryData.overview
            ? `
          <p style="margin: 20px auto 0; max-width: 600px; line-height: 1.6; opacity: 0.9;">
            ${itineraryData.overview}
          </p>
        `
            : ""
        }
      </div>

      <!-- Getting There -->
      <div style="margin-bottom: 50px;">
        <div style="display: flex; align-items: center; margin-bottom: 25px;">
          <span style="background: #88B537; padding: 8px; border-radius: 8px; margin-right: 12px;">
            🌍
          </span>
          <h2 style="margin: 0; color: #2E2B36; font-size: 24px;">Getting There</h2>
        </div>
        ${generateStationsContent(routeData?.nearestStations)}
      </div>

      <!-- Transportation -->
      <div style="margin-bottom: 50px;">
        <div style="display: flex; align-items: center; margin-bottom: 25px;">
          <span style="background: #88B537; padding: 8px; border-radius: 8px; margin-right: 12px;">
            🚆
          </span>
          <h2 style="margin: 0; color: #2E2B36; font-size: 24px;">Transportation Options</h2>
        </div>
        ${generateTransportContent(routeData)}
      </div>
    </div>
  `;
};

export const getPdfOptions = (destination, duration) => ({
  margin: [10, 10, 10, 10],
  filename: `${destination}-${duration}days-itinerary.pdf`,
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: {
    scale: 2,
    useCORS: true,
    logging: false,
    letterRendering: true,
  },
  jsPDF: {
    unit: "mm",
    format: "a4",
    orientation: "portrait",
    compress: true,
  },
  pagebreak: { mode: ["avoid-all", "css", "legacy"] },
});
