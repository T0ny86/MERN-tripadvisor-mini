import { format } from "timeago.js"
import Star from "@material-ui/icons/Star"
import { Popup } from "react-map-gl";
import styles from "../App.module.css"

const Note = ({lon, lat, title, description, username, createdAt}) => {
    return (
        <Popup longitude={lon} latitude={lat} className={styles.toFront}
        onOpen={()=> console.log("opened")}
        onClose={()=> console.log("closed")}
        
            anchor="top"
            >
            <div className={styles.card}>
                <label>Place</label>
                <h4 className={styles.place}> {title} </h4>
                <label>Review</label>
                <p className={styles.description} > {description} </p>
                <label>Rating</label>
                <div className={styles.stars} >
                    <Star className={styles.star} />
                </div>
                <label>Information</label>
                <span className={styles.username}>creadted by <b> {username} </b></span>
                <span className={styles.date} > {format(createdAt)} </span>
            </div>
        </Popup>
    );
}

export default Note;
// onClose={() => console.log('close')}