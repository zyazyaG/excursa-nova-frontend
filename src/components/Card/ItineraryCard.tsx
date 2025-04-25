import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
  } from '@mui/material';
  import { Itinerary } from '../../types/itinerary';
  import MarkdownOutput from '../MarkdownOutput/MarkdownOutput';
import { formatDate } from '../../utils';
  
  type Props = {
    itinerary: Itinerary;
  };
  
  export default function ItineraryCard({ itinerary }: Props) {
    
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
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                    {itinerary.name || itinerary.destination || 'Untitled Trip'}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                    {formatDate(itinerary.startDate)} → {formatDate(itinerary.endDate)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => {}}>
                    View
                </Button>
            </CardActions>
        </Card>
    );
}
  