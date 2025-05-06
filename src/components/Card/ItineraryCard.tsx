import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Itinerary } from '../../types/itinerary';
import { formatDate } from '../../utils';
import { useNavigate } from 'react-router';
import { FaPenFancy } from "react-icons/fa";
import { useState } from 'react';
  
type Props = {
    itinerary: Itinerary;
    onNameUpdate?: (id: string, newName: string) => void;
};
  
export default function ItineraryCard({ itinerary, onNameUpdate }: Props) {
    const navigator = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(itinerary.name || 'Untitled Trip');

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <a href={itinerary.imgURL[0]} target='_black' rel="noreferrer noopener">
                <CardMedia
                    component="img"
                    height="200"
                    title={"Picture from Unsplash.com: " + itinerary.imgURL[1]}
                    image={itinerary.imgURL[0]}
                    alt={"Picture from Unsplash.com -- "}
                /> 
            </a>   
            <CardContent sx={{ flexGrow: 1 }} style={{paddingBottom: "0px"}}>
                {isEditing ? (
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onBlur={() => {
                            setIsEditing(false);
                            if (onNameUpdate && newName !== itinerary.name) {
                                onNameUpdate(itinerary._id, newName);
                            }
                        }}
                        autoFocus
                        style={{ 
                            fontSize: '1.5rem', 
                            width: '100%', 
                            border: 'none', 
                            padding: '4px',
                            outline: 'none'
                        }}
                    />
                ) : (
                    <Typography variant="h5" gutterBottom>
                        {newName}{" "}
                        <FaPenFancy
                            size={14}
                            color='#507281'
                            style={{ cursor: 'pointer' }}
                            onClick={() => setIsEditing(true)}
                        />
                    </Typography>
                )}
                <Typography variant="body1" color="text.secondary" gutterBottom>
                    Destination: {itinerary.destination}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Dates: {formatDate(itinerary.startDate)} → {formatDate(itinerary.endDate)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => navigator(`/itineraries/${itinerary._id}`)}>
                    View Details
                </Button>
            </CardActions>
        </Card>
    );
}
  