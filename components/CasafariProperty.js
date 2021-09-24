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
        <View style={styles.section}>
          <Text style={styles.gallery}> Name: </Text>
          <Text style={styles.title}>{data[0].title}</Text>
        </View>
        <View style={styles.wrap}>
          <View style={styles.section2}>
            <Text style={styles.gallery}> Price: </Text>
            <Text style={styles.title}>{data[0].price}</Text>
          </View>
          <View style={styles.section2}>
            <Text style={styles.gallery}> Beds: </Text>
            <Text style={styles.title}>{data[0].beds}</Text>
          </View>
          <View style={styles.section2}>
            <Text style={styles.gallery}> Baths: </Text>
            <Text style={styles.title}>{data[0].baths}</Text>
          </View>
          <View style={styles.section2}>
            <Text style={styles.gallery}> Surface: </Text>
            <Text style={styles.title}>{data[0].surface}</Text>
          </View>
          <View style={styles.section2}>
            <Text style={styles.gallery}> Rooms: </Text>
            <Text style={styles.title}>{data[0].rooms}</Text>
          </View>
          <View style={styles.section2}>
            <Text style={styles.gallery}> Sale Status: </Text>
            <Text style={styles.title}>{data[0].status}</Text>
          </View>
          <View style={styles.section2}>
            <Text style={styles.gallery}> Connect: </Text>
            <Text style={styles.title}>{data[0].content}</Text>
          </View>
        </View>
        <View style={styles.wrap}>
          <Text style={styles.gallery}> Characteristics: </Text>

          <View style={styles.wrapping}>
            {data[0].features.map((li, key) => {
              return (
                <View style={styles.section2} key={key}>
                  <Text style={styles.title}>{li}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.gallery}>Gallery:</Text>
        </View>
        <View style={styles.wrapper}>
          {data[0].image.map((img, key) => {
            return (
              <Image
                key={key}
                style={styles.img}
                // cache={false}
                // crossOrigin="Anonymous"
                // allowDangerousPaths={true}
                src={{
                  uri: "https://cors.bridged.cc/" + img.src,
                  method: "GET",
                  headers: { "Cache-Control": "no-cache" },
                }}
              />
            );
          })}
        </View>
        <View style={styles.footer}>
          <Text style={styles.detail}>
            © {Year + " "} The Orchid Group Properties. All rights reserved.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default Property;