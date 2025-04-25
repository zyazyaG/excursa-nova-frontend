import {
    Button,
    Card,
    CardActions,
    CardContent,
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
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                    {itinerary.name || itinerary.destination || 'Untitled Trip'}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {formatDate(itinerary.startDate)} → {formatDate(itinerary.endDate)}
                </Typography>
                <div style={{ marginTop: '0.5rem' }}><MarkdownOutput markdown={`${itinerary.content.substring(0, 70)}...`}/></div>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => {}}>
                    View
                </Button>
            </CardActions>
        </Card>
    );
}
  