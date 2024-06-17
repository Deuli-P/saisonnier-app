import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

const DatePost = ({ date, styles }) => {
  const [datePost, setDatePost] = useState();

  useEffect(() => {
    console.log("[DATEPOST] dateImport:", date);
    checkTime();
    console.log("[DATEPOST] datePost:", datePost);
  }, [date]);

  const checkTime = () => {
    const dateObj = new Date(date);
    const maintenant = new Date();
    const differenceMinutes = (maintenant - dateObj) / 60000;
    // Si difference < 2 jours alors afficher 1 jour
    if (differenceMinutes < 172800 && differenceMinutes > 86400) {
      // si moins de 1 jour alors afficher par heure
      if (differenceMinutes < 1440) {
        // si moins de 1 heure alors afficher par minute
        if (differenceMinutes < 60) {
          setDatePost("moins de 30 m");
          // Si moins de 5 min alors afficher "moins de 5 min"
          if (differenceMinutes < 5) {
            setDatePost("moins de 5 m");
          }
        } else {
          setDatePost("moins d'1 h");
        }
      } else {
        setDatePost("moins d'1 jour");
      }
    } else {
      // afficher par nombre de jours accomplis
      const nombreJours = Math.floor(differenceMinutes / 1440);
      const message = `plus de ${nombreJours} jours`;
      setDatePost(message);
    }
  };

  return (
    <View style={styles.dateContainer}>
      <Text style={styles.dateText}>{datePost ? datePost : "erreur"}</Text>
    </View>
  );
};

export default DatePost;

const styles = StyleSheet.create({});
