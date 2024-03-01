import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import SubmitButton from "../../Buttons/Submit";
import axios from "axios";
import { useAuth } from "../../../app/context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";

const HoraireShow = ({ data }) => {
  const { userId } = useAuth();

  const emptyHoraires = [
    { morning: "", afternoon: "" },
    { morning: "", afternoon: "" },
    { morning: "", afternoon: "" },
    { morning: "", afternoon: "" },
    { morning: "", afternoon: "" },
    { morning: "", afternoon: "" },
    { morning: "", afternoon: "" },
  ];
  const [horaireLoaded, setHoraireLoaded] = useState(false);
  const [openModalHoraire, setOpenModalHoraire] = useState(false);
  const [horaires, setHoraires] = useState(
    Array.isArray(data) ? data : emptyHoraires
  );
  const [newHoraires, setNewHoraires] = useState(
    Array.isArray(data) ? data : emptyHoraires
  );

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    if (data && horaires === data) {
      setHoraireLoaded(true);
    } else {
      setTimeout(() => {
        setHoraireLoaded(true);
      }, 1000);
    }
  }, [data, horaires]);

  const handleMorning = (text, dayNumber) => {
    const textTrim = text.trim().toLowerCase();
    if (textTrim != newHoraires[dayNumber].morning) {
      setNewHoraires((prev) => {
        return prev.map((el, i) => {
          if (i === dayNumber) {
            return { ...el, morning: textTrim };
          } else {
            return el;
          }
        });
      });
    }
  };

  const handleAfternoon = (text, dayNumber) => {
    const textTrim = text.trim().toLowerCase();
    if (textTrim != newHoraires[dayNumber].afternoon) {
      setNewHoraires((prev) => {
        return prev.map((el, i) => {
          if (i === dayNumber) {
            return { ...el, afternoon: textTrim };
          } else {
            return el;
          }
        });
      });
    }
  };

  const handleSubmitHoraire = async () => {
    console.log("submit horaire");
    try {
      console.log("[HORAIRE] new horaire a submit:", newHoraires);
      await axios
        .post(
          `http://localhost:8002/entreprise/opening-hours/${userId}`,
          newHoraires
        )
        .then((res) => {
          console.log("[HORAIRE] Reponse sbumit horaire est:", res.status);
          setHoraires(newHoraires);
          setOpenModalHoraire(false);
        });
    } catch (e) {
      console.log("[HORAIRE] error:", e);
    }
  };

  const handleOpenModalHoraire = () => {
    setOpenModalHoraire(true);
  };

  const handleCloseModalHoraire = () => {
    setOpenModalHoraire(false);
  };

  return (
    <View
      style={{
        width: "90%",
        alignItems: "center",
        gap: 10,
        position: "relative",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color:'#ECE1E1' }}>Openning Hours</Text>
        <Pressable
          style={{
            padding: 10,
            borderRadius: 50,
            backgroundColor: "#E37322",
            zIndex: 100,
            borderColor: "#4C7D9F",
            borderLeftWidth: 2,
          }}
          onPress={() => handleOpenModalHoraire()}
        >
          <FontAwesome name="pencil" size={20} color="white" />
        </Pressable>
      </View>
      <View style={stylesArray.container}>
        {!horaireLoaded ? (
          <>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 30,
                paddingVertical: 5,
              }}
            >
              LOADING...
            </Text>
          </>
        ) : (
          horaires.map((item, index) => (
            <View style={stylesArray.ligne} key={`row-${days[index]}`}>
              <View
                style={{
                  width: "40%",
                  alignItems: "flex-start",
                  textAlign: "left",
                }}
              >
                <Text style={stylesArray.dayText}>{days[index]}</Text>
              </View>
              <View style={stylesArray.timeContainerGlobal}>
                {item.morning === "close" && item.afternoon === "close" ? (
                  <Text style={stylesArray.closeText}>Close</Text>
                ) : (
                  <>
                    <View
                      style={[
                        stylesArray.timeContainer,
                        { backgroundColor: "#71A9E9" , fontSize:20},
                      ]}
                    >
                      <Text style={stylesArray.timeText}>
                        {item.morning ? item.morning : "???"}
                      </Text>
                    </View>
                    <View
                      style={[
                        stylesArray.timeContainer,
                        { backgroundColor: "#EAC12E",fontSize:20 },
                      ]}
                    >
                      <Text style={stylesArray.timeText}>
                        {item.afternoon ? item.afternoon : "???"}
                      </Text>
                    </View>
                  </>
                )}
              </View>
            </View>
          ))
        )}
      </View>
      <Modal
        visible={openModalHoraire}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setOpenModalHoraire(false)}
      >
        <View style={stylesUpdate.modal}>
          <View style={stylesUpdate.container}>
            <View style={{ width: "100%", alignItems: "center" }}>
              <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10, color:"#ECE1E1" }}>
                Update Hours
              </Text>
              <View style={stylesUpdate.Array}>
                {horaireLoaded
                  ? newHoraires?.map((item, index) => (
                      <View
                        style={stylesUpdate.ligneContainer}
                        key={`update-${days[index]}`}
                      >
                        <View style={stylesArray.dayContainer}>
                          <Text style={stylesUpdate.dayTextInput}>{days[index]}</Text>
                        </View>
                        <View style={stylesUpdate.inputContainer}>
                          <TextInput
                            style={stylesUpdate.textInput}
                            value={item.morning}
                            onChangeText={(text) => handleMorning(text, index)}
                          />
                          <TextInput
                            style={stylesUpdate.textInput}
                            value={item.afternoon}
                            onChangeText={(text) =>
                              handleAfternoon(text, index)
                            }
                          />
                        </View>
                      </View>
                    ))
                  : null}
              </View>
            </View>
            <View style={stylesUpdate.submitContainer}>
              <SubmitButton
                title="Cancel"
                onPress={() => handleCloseModalHoraire()}
                typeAccount='entreprise'
                />
              <SubmitButton
                title="Submit"
                onPress={() => handleSubmitHoraire()}
                typeAccount='entreprise'
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HoraireShow;

const stylesArray = StyleSheet.create({
  container: {
    borderLeftColor: "#E37322",
    backgroundColor:"#ECE1E1",
    borderLeftWidth: 3,
    borderRadius: 20,
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal:6,
    width: "100%",
    position: "relative",
  },
  ligne: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
  },
  dayContainer: {
    width: "30%",
    alignItems: "flex-start",
    textAlign: "left",
  },
  dayText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  timeContainerGlobal: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,

  },
  timeContainer: {
    alignItems: "center",
    width: "50%",
    paddingVertical: 3,
  },
  timeText: {
    textAlign: "center",
    color: "white",
  },
  closeText: {
    width: "100%",
    textAlign: "center",
    color: "#B81F1F",
    backgroundColor: "#F69B9B",
    paddingVertical: 2,
    fontSize:20,
  },
});

const stylesUpdate = StyleSheet.create({
  modal: {
    width: "100%",
    backgroundColor: "rgba(40, 36, 36, 0.9)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    margin: 20,
    backgroundColor: "#242734",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
  },
  textInput: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    width: "50%",
    backgroundColor: "#BBBBC0",
    textAlign: "center",
  },
  submitContainer: {
    flexDirection: "row",
    gap: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,

    marginTop: 15,
  },
  inputContainer: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 5,
  },
  Array: {
    width: "100%",
    borderLeftColor: "#E37322",
    backgroundColor: "#D9D9D9",
    borderLeftWidth: 2,
    borderBottomColor: "black",
    borderBottomWidth: 2,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 16,
    paddingHorizontal:4,
    marginTop: 20,
  },
  ligneContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical:10,
    justifyContent: "center",
  },
  dayTextInput:{
    fontWeight: "bold",
    fontSize: 14,
  }
});
