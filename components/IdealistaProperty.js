import React from "react";
import {
  Page,
  Image,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
  },
  section: {
    width: "100%",
    margin: "0 10",
    marginTop: 5,
    marginBottom: 5,
    padding: "0 10",
  },
  wrap: {
    width: "100%",
    margin: "0 10",
    marginTop: 5,
    marginBottom: 5,
    padding: "0 10",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  wrapping: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  section2: {
    width: "50%",
    flexDirection: "column",
  },
  title: {
    fontWeight: 900,
    fontFamily: "Oswald",
    width: "95%",
  },
  description: {
    width: "90%",
    fontSize: 14,
    fontFamily: "Oswald",
  },
  wrapper: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  gallery: {
    textTransform: "uppercase",
    letterSpacing: "6px",
    marginTop: 10,
    fontSize: 12,
    color: "#9D9D9D",
    fontFamily: "Oswald",
  },
  detail: {
    fontSize: 12,
    color: "#9D9D9D",
    fontFamily: "Oswald",
    textDecoration: "none",
  },
  name: {
    fontSize: 16,
    fontFamily: "Oswald",
  },
  img: {
    width: "280px",
    height: "156px",
    margin: "5",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    marginTop: 10,
    position: "relative",
    top: "1",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "96.5%",
    borderBottom: "1px solid #05152e",
    marginBottom: 20,
  },
  intro: {
    flexDirection: "column",
  },
  frontpage: {
    backgroundColor: "#05152e",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  frontlogo: {
    width: 250,
    marginTop: 10,
    position: "relative",
    top: "1",
  },
  footerlink: {
    display: "flex",
    flexDirection: "row",

    justifyContent: "space-between",
  },
  footerdetail: {
    fontSize: 12,
    color: "#9D9D9D",
    fontFamily: "Oswald",
    textDecoration: "none",
    padding: "0 20px",
  },
});

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

// Create Document Component
const Property = ({ data }) => {
  //   console.log(data);
  const Year = new Date().getFullYear();
  return (
    <Document>
      <Page size="LETTER" style={styles.frontpage}>
        <Image src="/white.jpeg" style={styles.frontlogo} />
      </Page>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.header}>
            <Image src="/logo.jpeg" style={styles.logo} />
            <View style={styles.intro}>
              <Text style={styles.name}> Kelly Osorio Oviedo</Text>
              <Text style={styles.detail}> Real Estate Manager</Text>
              <Text style={styles.detail}> The Orchid Group Properties</Text>
              <Link src="tel:+34 610 996 112" style={styles.detail}>
                {" "}
                +34 610 996 112
              </Link>
            </View>
          </View>
        </View>
        {data.title && (
          <View style={styles.section}>
            <Text style={styles.gallery}> Name: </Text>
            <Text style={styles.title}>{data.title}</Text>
          </View>
        )}
        <View style={styles.section}>
          <Text style={styles.gallery}> Description: </Text>
          <Text style={styles.title}>{data.description}</Text>
        </View>
        <View style={styles.wrap}>
          <View style={styles.section2}>
            <Text style={styles.gallery}> Price: </Text>
            <Text style={styles.title}>{data.price}</Text>
          </View>
          <View style={styles.section2}>
            <Text style={styles.gallery}> Location: </Text>
            <Text style={styles.title}>{data.location}</Text>
          </View>
          <View style={styles.section2}>
            <Text style={styles.gallery}> Beds: </Text>
            <Text style={styles.title}>{data.beds}</Text>
          </View>
          <View style={styles.section2}>
            <Text style={styles.gallery}> Area: </Text>
            <Text style={styles.title}>{data.area}</Text>
          </View>
        </View>
        {data.Amenities && (
          <View style={styles.wrap}>
            <Text style={styles.gallery}> Amenities: </Text>

            <View style={styles.wrapping}>
              {data.Amenities.map((li, key) => {
                return (
                  <View style={styles.section2} key={key}>
                    <Text style={styles.title}>{li}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}
        {data.BuildingAmenities && (
          <View style={styles.wrap}>
            <Text style={styles.gallery}> Amenities: </Text>

            <View style={styles.wrapping}>
              {data.BuildingAmenities.map((li, key) => {
                return (
                  <View style={styles.section2} key={key}>
                    <Text style={styles.title}>{li}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}
        <View style={styles.section}>
          <Text style={styles.gallery}>Gallery:</Text>
        </View>
        <View style={styles.wrapper}>
          {data.images.splice(0, 12).map((img, key) => {
            return (
              <Image
                key={key}
                style={styles.img}
                // cache={false}
                // crossOrigin="Anonymous"
                // allowDangerousPaths={true}
                src={{
                  uri: "https://cors-anywhere.herokuapp.com/" + img,
                  method: "GET",
                  headers: {
                    "Cache-Control": "no-cache",
                  },
                }}
              />
            );
          })}
        </View>
        <View style={styles.footer}>
          <Text style={styles.detail}>
            © {Year + " "} The Orchid Group Properties. All rights reserved.
          </Text>
          <View style={styles.footerlink}>
            <Link
              src="www.theorchidgroup.properties"
              style={styles.footerdetail}
            >
              {" "}
              www.theorchidgroup.properties
            </Link>
            <Link
              src="mailto:info@theorchidgroup.properties"
              style={styles.footerdetail}
            >
              {" "}
              info@theorchidgroup.properties
            </Link>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Property;
