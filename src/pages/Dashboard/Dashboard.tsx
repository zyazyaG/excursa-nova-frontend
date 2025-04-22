import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/Button/Button";
import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Itinerary } from "../../types/itinerary";
import ItineraryCard from "../../components/Card/ItineraryCard";
import { useAxios } from "../../hooks/useAxios";

export default function Dashboard() {
  const { user } = useAuth();
  const navigator = useNavigate();
  const axiosPrivate = useAxios();
  const [itineraries, setItineraries] = useState<Itinerary[] | []>([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getAllItineraries = async() => {
        try {

            const response = await axiosPrivate.get("/itineraries?limit=4", {signal: controller.signal});
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

  return (
    <div>
      <div>
        <div>
          <h3>Welcome, {user?.name}</h3>
        </div>
        <div>
          <Box>
            <p>Ready to plan your next adventure?</p>
            <Button variant="primary" onClick={() => navigator("/generate")}>Generate New Trip</Button>
          </Box>
        </div>
        <div>
          <h3>Your Recent Trips</h3>
          <Box>
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

          </Box>
        </div>
      </div>
    </div>
  );
}