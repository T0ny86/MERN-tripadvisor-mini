import { format } from "timeago.js"
import Star from "@material-ui/icons/Star"
import { Popup } from "react-map-gl";
import styles from "../App.module.css"

const Note = ({ lon, lat, title, description, username, createdAt, setCurrId }) => {
    return (
        <Popup longitude={lon} latitude={lat} className={styles.toFront}
            // onOpen={()=> console.log("opened")}
            // onCloe={()=> console.log("closed")}
            closeButton={true}
            closeOnClick={false}
            onClose={() => { setCurrId(null) }}
            offset={[4, 1]}
            anchor="left"
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