import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material'
import { Itinerary } from '../../types/itinerary';
import MarkdownOutput from '../MarkdownOutput/MarkdownOutput';

type Props = {
    itinerary: Itinerary;
  };

export default function ItineraryCard({itinerary}: Props) {

    
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h5" gutterBottom>
                {itinerary.destination || `Trip to ${itinerary.destination}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {itinerary.startDate?.toString()} → {itinerary.endDate?.toString()}
            </Typography>
            <Typography variant="body2" mt={1}>
                <MarkdownOutput markdown={itinerary.content.substring(0, 100)}/>...
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" onClick={() => {}}>
                View
            </Button>
        </CardActions>
    </Card>
  )
}
