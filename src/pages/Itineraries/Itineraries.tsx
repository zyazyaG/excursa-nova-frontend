import { Box, Paper } from "@mui/material";
import {styled} from "@mui/material/styles"
import  Grid  from "@mui/material/Grid";
import ItineraryCard from "../../components/Card/ItineraryCard";
import { Itinerary } from "../../types/itinerary";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";

export default function Itineraries() {

    const [itineraries, setItineraries] = useState<Itinerary[] | []>([]);
    const { token } = useAuth();
    const axiosPrivate = useAxios();

    // useEffect(() => {
    //     const fetchItineraries = async () => {
    //         if (!token) return;

    //         try {
    //             const data = await getAllItineraries(token);
    //             setItineraries(data);
    //         } catch (err) {
    //             console.error("Failed to load itineraries:", err);
    //         }
    //     };

    //     fetchItineraries();
    // }, [token]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getAllItineraries = async() => {
            try {

                const response = await axiosPrivate.get("/itineraries");
                isMounted && setItineraries(response.data)


            } catch (error) {
                console.log(error);
            }
        }
        getAllItineraries();

        return () => {
            isMounted = false;
            controller.abort();
        }

    }, [])


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
                    <div>
                        {/* add generate button */}
                    </div>
                    {itineraries?.length ? 
                        <Box sx={{flexGrow: 1}}>
                            <Grid container spacing={2}>
                                {itineraries!.map(itinerary => (
                                    <Grid size={3} key={itinerary._id}>
                                        <ItineraryCard itinerary={itinerary}/>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box> : <p>No itineraries to display</p>
                    }

                </div>
            </div>
        </div>
    )
}
