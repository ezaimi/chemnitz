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

interface CustomCardProps {
  title: string;
  img: string;
}

export default function CustomCard({ title, img }: CustomCardProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [favorited, setFavorited] = React.useState(false);

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
        width: expanded ? 350 : 250,
        height: 400,
        borderRadius: 3,
        transition: 'width 0.4s ease-in-out',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
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
            src={img}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 'inherit',
            }}
          />

          {/* Favorite Icon Box */}
          <Box
            onClick={handleFavoriteClick}
            sx={{
              position: 'absolute',
              top: 13,
              right: '5%',
              width: 30,
              height: 30,
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            {favorited ? (
              <FavoriteIcon
                fontSize="small"
                sx={{ fontSize: 16, color: 'red', opacity: 0.9 }}
              />
            ) : (
              <FavoriteBorderIcon
                fontSize="small"
                sx={{ fontSize: 16, color: 'black', opacity: 0.9 }}
              />
            )}
          </Box>
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
            {title}
          </Typography>
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
        <IconButton
          aria-label="add to favorites"
          onClick={handleFavoriteClick}
        >
          {favorited ? (
            <FavoriteIcon sx={{ color: 'red' }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>

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
