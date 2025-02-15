// services/pdfGenerator.js
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

import React from "react";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  section: {
    marginBottom: 15,
  },
  dayTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: "#2E2B36",
  },
  activity: {
    marginBottom: 8,
    paddingLeft: 15,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  routeInfo: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: "#BCBCBC",
  },
});

// PDF Document component
const TripItineraryDocument = ({
  destination,
  duration,
  itineraryData,
  routeData,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.section}>
        <Text style={styles.title}>{destination} Trip Itinerary</Text>
        <Text style={styles.text}>Duration: {duration} days</Text>
      </View>

      {/* Itinerary Details */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Daily Itinerary</Text>
        {itineraryData?.days?.map((day, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.dayTitle}>
              Day {day.day}: {day.title}
            </Text>
            {day.activities.map((activity, actIndex) => (
              <View key={actIndex} style={styles.activity}>
                <Text style={styles.text}>Time: {activity.time}</Text>
                <Text style={styles.text}>{activity.title}</Text>
                <Text style={styles.text}>{activity.description}</Text>
                {activity.location && (
                  <Text style={styles.text}>Location: {activity.location}</Text>
                )}
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* Transport Information */}
      <View style={styles.routeInfo}>
        <Text style={styles.subtitle}>Transportation Options</Text>
        {routeData?.nearestStations && (
          <View style={styles.section}>
            <Text style={styles.text}>Nearest Stations:</Text>
            {routeData.nearestStations.railway && (
              <Text style={styles.text}>
                Railway: {routeData.nearestStations.railway.name} (
                {routeData.nearestStations.railway.distance})
              </Text>
            )}
            {routeData.nearestStations.airport && (
              <Text style={styles.text}>
                Airport: {routeData.nearestStations.airport.name} (
                {routeData.nearestStations.airport.distance})
              </Text>
            )}
            {routeData.nearestStations.bus && (
              <Text style={styles.text}>
                Bus: {routeData.nearestStations.bus.name} (
                {routeData.nearestStations.bus.distance})
              </Text>
            )}
          </View>
        )}
      </View>
    </Page>
  </Document>
);

export const generatePDF = (tripData) => {
  return <TripItineraryDocument {...tripData} />;
};
