import { Box, Paper, TextField } from "@mui/material";
import  Grid  from "@mui/material/Grid";
import ItineraryCard from "../../components/Card/ItineraryCard";
import { FilterObject, Itinerary } from "../../types/itinerary";
import { ChangeEvent, useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import styles from "./Ititneraries.module.css";
import Button from "../../components/Button/Button";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Itineraries() {

    const [itineraries, setItineraries] = useState<Itinerary[] | []>([]);
    const [filteredItitneraries, setFilteredItineraries] = useState<Itinerary[] | []>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const axiosPrivate = useAxios();

    const [filters, setFilters] = useState<FilterObject>({
        searchString: "",
        destination: [],
        date: [],
        sort: ""
    });

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getAllItineraries = async() => {
            try {
                const response = await axiosPrivate.get("/itineraries", {signal: controller.signal});
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
    }, []);

    useEffect(() => {
        const data = sortAndFilterItineraries(filters);
        setFilteredItineraries(data);
    }, [itineraries, filters])

    const sortAndFilterItineraries = (filterObj: FilterObject) => {
        return itineraries.filter(itinerary => {
            return ((itinerary.destination && itinerary.destination.toLocaleLowerCase().indexOf(filterObj.searchString.toLocaleLowerCase())> -1) ||
            (itinerary.name && itinerary.name.toLocaleLowerCase().indexOf(filterObj.searchString.toLocaleLowerCase())> -1)) &&
            (filterObj.destination.length > 0 ? filterObj.destination.includes(itinerary.destination) : true);
        })

    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setFilters({
            ...filters,
            searchString: e.target.value
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                <div className={styles.filterSearch}>
                    <Button variant="primary" onClick={() => setIsOpen(true)} style={{height: "55px", marginRight:"10px"}}>Side</Button>
                    <TextField 
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        label="Search"
                        onChange={handleSearch}
                    />
                </div>
                <div className={styles.header}>
                    <h2>Your History of Itineraries</h2>
                </div>
                <div className={styles.itinerariesGrid}>
                    <div>
                        {/* add generate button */}
                    </div>
                    {itineraries?.length ? 
                        <Box sx={{flexGrow: 1}}>
                            <Grid container spacing={2}>
                                {filteredItitneraries!.map(itinerary => (
                                    <Grid size={3} key={itinerary._id}>
                                        <ItineraryCard itinerary={itinerary}/>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box> : <p>No itineraries to display</p>
                    }

                </div>
            </div>
            <Sidebar {...{isOpen, setIsOpen, filters, setFilters, itineraries}} />
        </div>
    )
}
