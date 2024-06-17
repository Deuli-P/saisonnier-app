import { createContext, useContext, useEffect, useState } from "react";


const PostContext = createContext({
    text: "",
    setText: ()=>{},
    media: "",
    setMedia: ()=>{},
    sondage: "",
    setSondage: ()=>{},
    event: "",
    setEvent: ()=>{},
    categorie: "",
    setCategorie: ()=>{},
    SubmitPost: ()=>{},
});

export const usePost = () => {
    return useContext(PostContext);
}

export const PostProvider = ({ children }) => {

    const [ text, setText ] = useState("");
    const [ media, setMedia ] = useState(null);
    const [ sondage, setSondage ] = useState({
        sondageQuestion : "",
        sondageOption : [],
        sondageEnding: "",
    });
    const [ event, setEvent ] = useState({
        eventTitle : "",
        eventStartingDate : "",
        eventStartingHour : "",
        eventEndingDate : "",
        eventEndingHour : "",
        eventPlace : "",
        eventDescription : "",
        eventIntervenant : "",
    });
    const [ categorie, setCategorie ] = useState("General");


    const SubmitPost = async()=> {
        const post = {
            postDescription : text,
            postImage : media ? media : null,
            postSondage : sondage? sondage : null,
            postEvent : event ? event : null,
            postCategory : categorie,
        }

    }

    const values={
        text: text,
        setText,
        media: media,
        setMedia,
        sondage: sondage,
        setSondage,
        event: event,
        setEvent,
        categorie: categorie,
        setCategorie,
        SubmitPost,
    };

    return(
        <PostContext.Provider value={values}>
            {children}
        </PostContext.Provider>
    )
}

