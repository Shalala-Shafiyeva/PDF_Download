import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  PDFDownloadLink,
  Font
} from "@react-pdf/renderer";

function DocTemplate() {
  const [lastPresentation, setLastPresentation] = useState({});
  const handleLastPresentation = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/presentation", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setLastPresentation(result.data || {});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLastPresentation();
  }, []);

  Font.register({
    family:"Times",
      src:"/fonts/Times\ New\ Roman.ttf", 
  });

  const styles = StyleSheet.create({
    page: {
      display: "flex",
      flexDirection: "column",
      padding: 20,
    },
    section: {
      margin: 10,
      padding: 10,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 20,
      marginBottom: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
    header: {
      textAlign: "right",
      marginBottom: 20,
    },
    description: {
      marginTop: 20,
      textAlign: "justify",
    },
    footer: {
      marginTop: 50,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
  });

  const DocTemplate = () => {
    return (
      <>
        <Document style={{ width: "70%", fontFamily:"Times" }}>
          {!lastPresentation ? (
            <Page>
              <Text style={styles.title}>There is no presentation</Text>
            </Page>
          ) : (
            <Page size="A4" style={styles.page}>
              <View style={styles.header}>
                <Text>
                  "Azad Azərbaycan" MTRK-nın{"\n"}
                  <br />
                  {lastPresentation.receiver_user?.position}
                  {"\n"}
                  <br />
                  {lastPresentation.receiver_user?.name}{" "}
                  {lastPresentation.receiver_user?.surname}
                  <br />
                </Text>
                <Text>
                  {lastPresentation.sender_user?.position}
                  {"\n"}
                  <br />
                  {lastPresentation.sender_user?.name}{" "}
                  {lastPresentation.sender_user?.surname} terefinden
                  <br />
                </Text>
              </View>
              <Text style={styles.title}>{lastPresentation.title}</Text>
              <Text style={styles.description}>
                {lastPresentation.description}
              </Text>
              <View style={styles.footer}>
                <Text>
                  {lastPresentation.sender_user?.name}{" "}
                  {lastPresentation.sender_user?.surname}
                </Text>
                <Text>{lastPresentation.date}</Text>
              </View>
            </Page>
          )}
        </Document>
      </>
    );
  };

  return (
    <>
      <div className="main-container">
        {!lastPresentation ? (
          <div className="wrapper">
            <Text style={styles.title}>There is no presentation</Text>
          </div>
        ) : (
          <div className="wrapper">
            <PDFDownloadLink
              document={<DocTemplate />}
              fileName={`TQ24-0${lastPresentation?.id}.pdf`}
              className="btn create"
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Download Now"
              }
            </PDFDownloadLink>
          </div>
        )}
      </div>
    </>
  );
}

export default DocTemplate;
