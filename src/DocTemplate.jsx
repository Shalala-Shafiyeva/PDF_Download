import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  PDFDownloadLink,
  Font,
} from "@react-pdf/renderer";
import { Link } from "react-router-dom";

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
    family: "Times",
    fonts: [
      {
        src: "/fonts/Times New Roman.ttf", // Regular font
        fontWeight: "normal",
        fontStyle: "normal",
      },
      {
        src: "/fonts/Times New Roman Bold.ttf", // Bold font
        fontWeight: "bold",
        fontStyle: "normal",
      },
      {
        src: "/fonts/times-new-roman-bold-italic.ttf",
        fontWeight: "bold",
        fontStyle: "italic",
      },
      {
        src: "/fonts/times-new-roman-italic.ttf",
        fontWeight: "normal",
        fontStyle: "italic",
      },
    ],
  });

  const styles = StyleSheet.create({
    page: {
      // width: "50%",
      fontFamily: "Times",
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      padding: 40,
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
      fontFamily: "Times",
      fontWeight: "bold",
      textAlign: "center",
      fontStyle: "italic",
    },
    header: {
      textAlign: "right",
      marginBottom: 30,
      fontWeight: "bold",
      fontFamily: "Times",
      fontSize: 14,
    },
    description: {
      textAlign: "justify",
      fontSize: 14,
      fontFamily: "Times",
      fontWeight: "normal",
    },
    footer: {
      marginTop: 70,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      fontStyle: "italic",
      fontFamily: "Times",
      fontSize: 14,
      padding: "0px 40px",
    },
  });

  const fileName = (title) => {
    switch (title?.toLowerCase().trim()) {
      case "təqdimat":
        return "TQ";
      case "ərizə":
        return "ER";
      case "təhvil təslim aktı":
        return "TT.A";
      case "təmir":
        return "TM";
      case "xidməti yazı":
        return "XY";
      case "rəy":
        return "R";
      case "qüsur aktı":
        return "Q.A";
      default:
        return "undefiend";
    }
  };

  const DocTemplate = () => {
    return (
      <>
        <Document style={{ width: "70%", fontFamily: "Times" }}>
          {!lastPresentation ? (
            <Page>
              <Text style={styles.title}>Hər hansısa sənəd tapılmadı</Text>
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
                  {lastPresentation.sender_user?.surname} tərəfindən
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
      <div style={{ width: "50%", margin: "auto", height: "max-content" }}>
        <Document style={{ width: "70%", fontFamily: "Times" }}>
          {!lastPresentation ? (
            <Page>
              <Text style={styles.title}>Hər hansısa sənəd tapılmadı</Text>
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
                  {lastPresentation.sender_user?.surname} tərəfindən
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
        <div className="template-container">
          {!lastPresentation ? (
            <div className="wrapper">
              <Text style={styles.title}>Heç bir təqdimat tapılmdı</Text>
            </div>
          ) : (
            <div className="wrapper">
              <PDFDownloadLink
                document={<DocTemplate />}
                fileName={
                  fileName(lastPresentation?.title) +
                  "24-0" +
                  lastPresentation?.id +
                  ".pdf"
                }
                className="btn create"
              >
                {({ blob, url, loading, error }) =>
                  loading ? "Sənəd yüklənir..." : "Yüklə"
                }
              </PDFDownloadLink>
              <div className="editBtn">
                <Link to={`/edit/${lastPresentation?.id}`} className="btn edit">Düzəliş et</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DocTemplate;
