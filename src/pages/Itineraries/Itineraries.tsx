import { Box, TextField } from "@mui/material";
import  Grid  from "@mui/material/Grid";
import ItineraryCard from "../../components/Card/ItineraryCard";
import { FilterObject, Itinerary } from "../../types/itinerary";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import styles from "./Itineraries.module.css";
import Button from "../../components/Button/Button";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Itineraries() {

    const [itineraries, setItineraries] = useState<Itinerary[] | []>([]);
    const [filteredItineraries, setFilteredItineraries] = useState<Itinerary[] | []>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const axiosPrivate = useAxios();

    const [filters, setFilters] = useState<FilterObject>({
        searchString: "",
        destination: [],
        date: [],
        sort: "desc"
    });


    const fetchItineraries = useCallback(() => {
        const controller = new AbortController();

        axiosPrivate
            .get("/itineraries", { signal: controller.signal })
            .then((response) => {
                setItineraries(response.data || []);
            })
            .catch((error) => {
                if (error.name !== "CanceledError") {
                    console.error("Failed to fetch itineraries:", error);
                }
            });

        return () => {
            controller.abort();
        };
    }, [axiosPrivate]);

    useEffect(() => {
        const abort = fetchItineraries();
        return abort;
    }, [fetchItineraries]);

    const handleNameUpdate = (_id: string, updatedName: string) => {
        axiosPrivate
            .patch(`/itineraries/${_id}`, { name: updatedName })
            .then(() => {
                fetchItineraries();
            })
            .catch(console.error);
    };

    useEffect(() => {
        const data = sortAndFilterItineraries(filters);
        setFilteredItineraries(data);
    }, [itineraries, filters]);

    const sortAndFilterItineraries = (filterObj: FilterObject) => {
        return itineraries.filter(itinerary => {
            return ((itinerary.destination && itinerary.destination.toLocaleLowerCase().indexOf(filterObj.searchString.toLocaleLowerCase())> -1) ||
            (itinerary.name && itinerary.name.toLocaleLowerCase().indexOf(filterObj.searchString.toLocaleLowerCase())> -1)) &&
            (filterObj.destination.length > 0 ? filterObj.destination.includes(itinerary.destination.split(":")[0]) : true);
        })
        .sort((a: Itinerary, b: Itinerary) => {
            const dateA = new Date(a.startDate!).getTime();
            const dateB = new Date(b.startDate!).getTime();
            if (filterObj.sort === "desc") {
                return dateB - dateA;
            } else {
                return dateA - dateB;
            }
        });

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
                    <Button variant="primary" onClick={() => setIsOpen(true)} style={{height: "55px", marginRight:"10px"}}>Filter Sort</Button>
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
                                {filteredItineraries!.map(itinerary => (
                                    <Grid size={3} key={itinerary._id}>
                                        <ItineraryCard itinerary={itinerary} onNameUpdate={handleNameUpdate}/>
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
