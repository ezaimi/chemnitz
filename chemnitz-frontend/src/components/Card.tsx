'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Feature } from '@/types/Features';
import { getFeatureProperties } from '@/utilities/featureHelper';
import Favourite from './general/Favourite';
import VisitSite from './general/VisitSite';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Rate from './general/Rate'; // Import your custom Rate component
import CustomPopover from './general/CustomPopover';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Popover } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import MakeReview from './general/MakeReview';
import PinDropIcon from '@mui/icons-material/PinDrop';
import LocationButton from './general/LocationButton';
import { formatAddress } from '@/utilities/featureHelper';

import { addToFavorites, removeFromFavorites, getFavorites } from '@/api/favoriteApi';


// Expand More Button styles
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}


interface CustomCardProps {
  features: Feature;
  selectedCategory: string;
  onLocationClick: (id: string) => void;
}

export default function CustomCard({ features, selectedCategory, onLocationClick }: CustomCardProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [favorited, setFavorited] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [anchorElName, setAnchorElName] = React.useState<HTMLElement | null>(null);
  const [anchorElDesc, setAnchorElDesc] = React.useState<HTMLElement | null>(null);
  const [isNameTruncated, setIsNameTruncated] = React.useState(false);
  const [isDescTruncated, setIsDescTruncated] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showReview, setShowReview] = React.useState(false);


  const featureProperties = getFeatureProperties(features, selectedCategory);
  const nameRef = React.useRef<HTMLSpanElement>(null);
  const descRef = React.useRef<HTMLSpanElement>(null);

  // Handle truncation detection for title and description
  React.useEffect(() => {
    setTimeout(() => {
      const elName = nameRef.current;
      if (elName) {
        setIsNameTruncated(Math.floor(elName.scrollWidth) > Math.floor(elName.clientWidth));
      }
      const elDesc = descRef.current;
      if (elDesc) {
        setIsDescTruncated(Math.floor(elDesc.scrollHeight) > Math.floor(elDesc.clientHeight));
      }
    }, 0);
  }, [featureProperties.name, featureProperties.description]);

  const handleExpandClick = () => {
    setExpanded((prev) => !prev);
  };




const handleFavoriteClick = async () => {
  const newState = !favorited;

  try {
    if (newState) {
      await addToFavorites(features.id);
      setFavorited(newState);
    } else {
      await removeFromFavorites(features.id);
      setFavorited(newState);
    }
  } catch (err: any) {
    console.error('Failed to update favorite', err);
    if (err.response && err.response.status === 401) {
      alert('Please login to set favourites');
    }

    setFavorited(!newState); 
  }

  console.log("here");
};



  const handleButtonClick = () => {
    onLocationClick(features.id);
  };

  const handleDescriptionClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isDescTruncated) {
      setAnchorElDesc(event.currentTarget);
    }
  };

  const handleTitleClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log("clicked title, isNameTruncated:", isNameTruncated);

    if (isNameTruncated) {

      setAnchorElName(event.currentTarget);
    }
  };

  const handleDialogClose = () => setOpenDialog(false);

  // Check if the feature has a valid external link (website)
  const website = featureProperties.website;
  const hasExternalLink = typeof website === 'string' && website.length > 0;

  const handleVisitSiteClick = () => {
    if (hasExternalLink) {
      window.open(website, '_blank');
    }
  };

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleAddReviewClick = () => {
    setShowReview(true);
    handlePopoverClose();
  };






  return (
    <Card
      sx={{
        width: '100%',
        height: 'auto',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxWidth: '25rem',
        minHeight: '26rem'
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

          <Favourite favorited={favorited} handleFavoriteClick={handleFavoriteClick} />
          <VisitSite
            onClick={handleVisitSiteClick} // Open the external link if available
            disabled={!hasExternalLink} // Disable if no external link exists
          />
        </CardMedia>

        <CardContent
          sx={{
            paddingTop: '4px',
            paddingBottom: '8px',
            paddingLeft: '16px',
            paddingRight: '16px',
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'black',
              paddingLeft: '4px',
              borderRadius: '4px',
              fontSize: '1.5rem',
              margin: 0,
              cursor: 'pointer',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            ref={nameRef}
            onClick={handleTitleClick}
          >
            {featureProperties.name}
          </Typography>

          <IconButton onClick={handlePopoverOpen}>
            <MoreVertIcon fontSize="small" />
          </IconButton>

        </CardContent>

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
              padding: '4px',
              fontSize: '0.9rem',
            }}
          >
            {formatAddress(featureProperties.address)}
          </Typography>


          <Typography
            variant="body2"
            sx={{
              color: 'text.primary',
              marginTop: '10px',
              fontSize: '0.9rem',
              padding: '4px',
              display: '-webkit-box',
              WebkitLineClamp: 2, // Limit to 2 lines
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              cursor: 'pointer',
            }}
            ref={descRef}
            onClick={handleDescriptionClick}
          >
            {featureProperties.description || 'No description available.'}
          </Typography>
        </CardContent>
      </div>

      <CardActions
        disableSpacing
        sx={{
          display: 'flex',
          justifyContent: 'space-between', // Ensure elements are spaced apart
          padding: '0.5rem 1rem',
          marginTop: 'auto', // Ensure the button is pushed to the bottom
        }}
      >
        <LocationButton handleButtonClick={handleButtonClick} />

        {/* Star Rating with Score */}
        <Rate rate={0} />

        {/* Display rate with a score of 0 */}
      </CardActions>


      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleAddReviewClick}>Make a Review</MenuItem>
      </Popover>


      <CustomPopover
        open={Boolean(anchorElName)}
        anchorEl={anchorElName}
        onClose={() => setAnchorElName(null)}
      >
        <Typography variant="body1">{featureProperties.name}</Typography>
      </CustomPopover>

      <CustomPopover
        open={Boolean(anchorElDesc)}
        anchorEl={anchorElDesc}
        onClose={() => setAnchorElDesc(null)}
      >
        <Typography variant="body1">{featureProperties.description}</Typography>
      </CustomPopover>

      {/* Dialog for full description */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Full Description</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {featureProperties.description || 'No description available.'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {showReview && <MakeReview onClose={() => setShowReview(false)} />}

    </Card>
  );
}
