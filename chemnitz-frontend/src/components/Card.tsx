'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Feature } from '@/types/Features';
import { getFeatureProperties } from '@/utilities/getFeatureProperties';

// Expand More Button styles
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})<ExpandMoreProps>(({ theme, expand }) => ({
  marginLeft: 'auto',
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

// Custom Card Component
interface CustomCardProps {
  features: Feature;
  selectedCategory: string;
}

export default function CustomCard({ features, selectedCategory }: CustomCardProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [favorited, setFavorited] = React.useState(false);
  const featureProperties = getFeatureProperties(features, selectedCategory);

  const handleExpandClick = () => {
    setExpanded((prev) => !prev);
  };

  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setFavorited((prev) => !prev);
  };

  return (
    <Card
      sx={{
        width: '100%',
        height: 400,
        borderRadius: 3,
        transition: 'width 0.4s ease-in-out',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxWidth: '25rem',
      }}
    >
      <div>
        <CardMedia
          component="div"
          sx={{
            position: 'relative',
            height: 194,
            width: '100%',
            padding: 1,
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <img
            src={'assets/image/chbg.png'}
            alt={'title'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 'inherit',
            }}
          />
        </CardMedia>

        <CardContent
          sx={{
            paddingTop: '4px',
            paddingBottom: '8px',
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              backgroundColor: '#f0f0f0',
              padding: '4px',
              borderRadius: '4px',
              margin: 0,
            }}
          >
            {featureProperties.name}
          </Typography>

          {/* Conditionally Render Based on Category Type */}
          {selectedCategory === 'restaurant' && (
            <>
              <Typography variant="body2">
                <strong>Address: </strong>{featureProperties.address}
              </Typography>
              <Typography variant="body2">
                <strong>Opening Hours: </strong>{featureProperties.openingHours}
              </Typography>
              <Typography variant="body2">
                <strong>Cuisine: </strong>{featureProperties.cuisine}
              </Typography>
              <Typography variant="body2">
                <strong>Phone: </strong>{featureProperties.phone}
              </Typography>
            </>
          )}

          {selectedCategory === 'museum' && (
            <>
              <Typography variant="body2">
                <strong>Address: </strong>{featureProperties.address}
              </Typography>
              <Typography variant="body2">
                <strong>Opening Hours: </strong>{featureProperties.openingHours}
              </Typography>
              <Typography variant="body2">
                <strong>Fee: </strong>{featureProperties.fee}
              </Typography>
              <Typography variant="body2">
                <strong>Description: </strong>{featureProperties.description}
              </Typography>
            </>
          )}

          {selectedCategory === 'gallery' && (
            <>
              <Typography variant="body2">
                <strong>Address: </strong>{featureProperties.address}
              </Typography>
              <Typography variant="body2">
                <strong>Opening Hours: </strong>{featureProperties.openingHours}
              </Typography>
              <Typography variant="body2">
                <strong>Fee: </strong>{featureProperties.fee}
              </Typography>
            </>
          )}

          {selectedCategory === 'artwork' && (
            <>
              <Typography variant="body2">
                <strong>Artist: </strong>{featureProperties.artistName}
              </Typography>
              <Typography variant="body2">
                <strong>Material: </strong>{featureProperties.material}
              </Typography>
              <Typography variant="body2">
                <strong>Fee: </strong>{featureProperties.fee}
              </Typography>
            </>
          )}

          {selectedCategory === 'guest_house' && (
            <>
              <Typography variant="body2">
                <strong>Address: </strong>{featureProperties.address}
              </Typography>
              <Typography variant="body2">
                <strong>Phone: </strong>{featureProperties.phone}
              </Typography>
              <Typography variant="body2">
                <strong>Indoor Seating: </strong>{featureProperties.indoorSeating}
              </Typography>
              <Typography variant="body2">
                <strong>Dietary Options: </strong>{featureProperties.dietaryOptions}
              </Typography>
            </>
          )}

          {selectedCategory === 'hotel' && (
            <>
              <Typography variant="body2">
                <strong>Address: </strong>{featureProperties.address}
              </Typography>
              <Typography variant="body2">
                <strong>Phone: </strong>{featureProperties.phone}
              </Typography>
              <Typography variant="body2">
                <strong>Rooms: </strong>{featureProperties.rooms}
              </Typography>
            </>
          )}

          {selectedCategory === 'bench' && (
            <>
              <Typography variant="body2">
                <strong>Artist: </strong>{featureProperties.artistName}
              </Typography>
              <Typography variant="body2">
                <strong>Material: </strong>{featureProperties.material}
              </Typography>
            </>
          )}

          {selectedCategory === 'theatre' && (
            <>
              <Typography variant="body2">
                <strong>Address: </strong>{featureProperties.address}
              </Typography>
              <Typography variant="body2">
                <strong>Opening Hours: </strong>{featureProperties.openingHours}
              </Typography>
              <Typography variant="body2">
                <strong>Description: </strong>{featureProperties.description}
              </Typography>
            </>
          )}

          {selectedCategory === 'clock' && (
            <>
              <Typography variant="body2">
                <strong>Display: </strong>{featureProperties.display}
              </Typography>
              <Typography variant="body2">
                <strong>Type: </strong>{featureProperties.type}
              </Typography>
            </>
          )}

          {selectedCategory === 'deli' && (
            <>
              <Typography variant="body2">
                <strong>Address: </strong>{featureProperties.address}
              </Typography>
              <Typography variant="body2">
                <strong>Opening Hours: </strong>{featureProperties.openingHours}
              </Typography>
              <Typography variant="body2">
                <strong>Cuisine: </strong>{featureProperties.cuisine}
              </Typography>
            </>
          )}
        </CardContent>
      </div>

      <CardActions
        disableSpacing
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'nowrap',
          gap: 1,
          padding: '0.5rem 1rem',
        }}
      >
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

        <Button
          variant="contained"
          size="small"
          sx={{
            minWidth: 80,
            height: 36,
            opacity: expanded ? 1 : 0,
            visibility: expanded ? 'visible' : 'hidden',
            transition: 'opacity 0.3s ease-in-out',
            whiteSpace: 'nowrap',
          }}
        >
          Action
        </Button>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
    </Card>
  );
}
