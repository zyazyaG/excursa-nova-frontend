import { Box, Paper } from "@mui/material";
import {styled} from "@mui/material/styles"
import  Grid  from "@mui/material/Grid";
import ItineraryCard from "../../components/Card/ItineraryCard";
import { Itinerary } from "../../types/itinerary";
import { useEffect, useState } from "react";
import { getAllItineraries } from "../../api/iterinaryApi";
import { useAuth } from "../../hooks/useAuth";

export default function Itineraries() {

    const [itineraries, setItineraries] = useState<Itinerary[] | []>([]);
    const { token } = useAuth();

    useEffect(() => {
        const fetchItineraries = async () => {
            if (!token) return;

            try {
                const data = await getAllItineraries(token);
                setItineraries(data);
            } catch (err) {
                console.error("Failed to load itineraries:", err);
            }
        };

        fetchItineraries();
    }, [token]);


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
          backgroundColor: '#1A2027',
        }),
      }));

    return (
        <div>
            <div>
                <div>
                    <h2>Your History of Itineraries</h2>
                </div>
                <div>
                    <Box sx={{flexGrow: 1}}>
                        <Grid container spacing={2}>
                            {itineraries!.map(itinerary => (
                                <Grid size={3} key={itinerary._id}>
                                    <ItineraryCard itinerary={itinerary}/>
                                </Grid>
                            ))}
                        </Grid>

                    </Box>

                </div>
            </div>
        </div>
    )
}
