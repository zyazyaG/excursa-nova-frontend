import { Checkbox, Drawer } from "@mui/material";
import Button from "../Button/Button";
import { FilterObject, Itinerary } from "../../types/itinerary";
import { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import { grey, yellow } from "@mui/material/colors";

type Props  = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    filters: FilterObject;
    setFilters: React.Dispatch<React.SetStateAction<FilterObject>>;
    itineraries: Itinerary [];

}

const Sidebar = ({ isOpen, setIsOpen, filters, setFilters, itineraries }: Props) => {
    const [destinations, setDestinations] = useState<string[]>([]);

    const handleSort = (sort: string) => {
        if (sort === "acs") {
            setFilters((prev) => ({
                ...prev,
                sort: "acs"
            }))
        } else {
            setFilters((prev) => ({
                ...prev,
                sort: "desc"
            }))
        }
    }

    useEffect(() => {
        console.log(itineraries)

        const destinationsList: string [] = itineraries.map(i => (i.destination.split(":")[0]));
        const uniqueDestinations = Array.from(new Set(destinationsList));
        setDestinations(uniqueDestinations);
        console.log(destinations);

    }, [itineraries])

    return (
        <Drawer variant="persistent" hideBackdrop={true} open={isOpen} >
            <div className={styles.container}>
                <div className={styles.header}>
                    <h4>Filter or Sort</h4>
                    <Button style={{fontSize: "18px"}} onClick={() => setIsOpen(false)}>x</Button>
                </div>
                <div className={styles.filtersGrid}>
                    <div className={styles.destination}>
                        <h4>Destination</h4>
                        {destinations.map((d, k) => (
                            <div key={k} className={styles.gridItem}>
                                <Checkbox 
                                    sx={{
                                        color: grey[100],
                                        '&.Mui-checked': {
                                            color: yellow[500],
                                        },
                                    }}
                                    onChange={(e) => {
                                        setFilters((prev) => ({
                                            ...prev,
                                            destination: e.target.checked
                                            ? [...prev.destination, d]
                                            : prev.destination.filter((dest) => dest !== d)
                                        }));
                                    }}
                                />
                                <p>{d}</p>
                            </div>
                    ))}

                    </div>
                    <div className={styles.date}>
                        <h4>Sort By</h4>
                        <Button style={{backgroundColor:"#8fc1e3", marginTop:"1rem"}} onClick={() => handleSort("acs")}>Start Date - Oldest to Newest</Button>
                        <Button style={{backgroundColor:"#8fc1e3"}} onClick={() => handleSort("desc")}>Start Date - Newest to Oldest</Button>
                        
                    </div>
                </div>
            </div>

        </Drawer>

    )
}
export default Sidebar;