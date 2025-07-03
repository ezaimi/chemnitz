'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Feature } from '@/types/Features';
import Favourite from './general/Favourite';
import VisitSite from './general/VisitSite';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Rate from './general/Rate';
import CustomPopover from './general/CustomPopover';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Popover } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import MakeReview from './general/MakeReview';
import LocationButton from './general/LocationButton';
import { formatAddress } from '@/utilities/featureHelper';
import { addToFavorites, removeFromFavorites } from '@/api/favoriteApi';
import { User } from '@/types/User';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Tooltip from '@mui/material/Tooltip';




interface CustomCardProps {
  features: Feature;
  selectedCategory: string;
  onLocationClick: (id: string) => void;
  contextUser: User | null;
  setUser: (user: User) => void;
  onReviewSubmitted: () => void;
}

export default function CustomCard({
  features,
  selectedCategory,
  onLocationClick,
  contextUser,
  setUser,
  onReviewSubmitted
}: CustomCardProps) {
  const [favorited, setFavorited] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [anchorElDesc, setAnchorElDesc] = React.useState<HTMLElement | null>(null);
  const [isNameTruncated, setIsNameTruncated] = React.useState(false);
  const [isDescTruncated, setIsDescTruncated] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showReview, setShowReview] = React.useState(false);

  // For name popover
  const [namePopoverEl, setNamePopoverEl] = React.useState<HTMLElement | null>(null);

  const featureProperties = features.properties;
  const nameRef = React.useRef<HTMLSpanElement>(null);
  const descRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    setTimeout(() => {
      const elName = nameRef.current;
      if (elName) {
        setIsNameTruncated(elName.scrollWidth > elName.clientWidth);
      }
      const elDesc = descRef.current;
      if (elDesc) {
        setIsDescTruncated(elDesc.scrollHeight > elDesc.clientHeight);
      }
    }, 0);
  }, [featureProperties.name, featureProperties.description]);

  React.useEffect(() => {
    if (contextUser && contextUser.favorites) {
      setFavorited(contextUser.favorites.includes(features.id));
    }
  }, [contextUser, features.id]);

  const handleFavoriteClick = async () => {
    if (!contextUser || !setUser) {
      alert('Please login to set favourites');
      return;
    }
    const newState = !favorited;
    try {
      if (newState) {
        await addToFavorites(features.id);
        setFavorited(true);
        setUser({
          ...contextUser,
          favorites: [...(contextUser.favorites || []), features.id],
        });
      } else {
        await removeFromFavorites(features.id);
        setFavorited(false);
        setUser({
          ...contextUser,
          favorites: (contextUser.favorites || []).filter((id) => id !== features.id),
        });
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        alert('Please login to set favourites');
      }
      setFavorited(!newState);
    }
  };

  const handleButtonClick = () => {
    onLocationClick(features.id);
  };

  const handleDescriptionClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isDescTruncated) {
      setAnchorElDesc(event.currentTarget);
    }
  };

  // Open the name popover only if truncated
  const handleNameClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isNameTruncated) {
      setNamePopoverEl(event.currentTarget);
    }
  };
  const handleNamePopoverClose = () => setNamePopoverEl(null);

  const handleDialogClose = () => setOpenDialog(false);

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
      className='custom-hover-card'
      sx={{
        width: '100%',
        height: 'auto',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxWidth: '25rem',
        minHeight: '26rem',
        border: '1px solid transparent',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        '&:hover': {
          borderColor: '#93b384',
          boxShadow: 8,
        },
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
            src={
              typeof featureProperties.image === "string" && featureProperties.image
                ? featureProperties.image
                : "/assets/image/cardNoImg.png"
            }
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
            onClick={handleVisitSiteClick}
            disabled={!hasExternalLink}
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
          <span
            ref={nameRef}
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              cursor: isNameTruncated ? 'pointer' : 'default',
              fontWeight: 600,
              fontSize: '1.1rem',
              color: '#222',
              maxWidth: 220,
              whiteSpace: 'nowrap'
            }}
            onClick={handleNameClick}
            title={isNameTruncated ? 'Show full name' : undefined}
          >
            {featureProperties.name}
          </span>
          <Popover
            open={Boolean(namePopoverEl)}
            anchorEl={namePopoverEl}
            onClose={handleNamePopoverClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            PaperProps={{ sx: { p: 2, maxWidth: 350 } }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '1.2rem', color: '#222', wordBreak: 'break-word' }}>
              {featureProperties.name}
            </Typography>
          </Popover>
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
              WebkitLineClamp: 2,
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
          justifyContent: 'space-between',
          padding: '0.5rem 1rem',
          marginTop: 'auto',
        }}
      >
        <LocationButton handleButtonClick={handleButtonClick} />

        {typeof features.averageRating === "number" && features.averageRating > 0 ? (
          <Rate rate={features.averageRating} />
        ) : (
          <Tooltip title="No rate yet" arrow>
            <span>
              <StarBorderIcon style={{ color: 'gold', fontSize: '1.4rem', cursor: 'pointer' }} />
            </span>
          </Tooltip>)}


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
        open={Boolean(anchorElDesc)}
        anchorEl={anchorElDesc}
        onClose={() => setAnchorElDesc(null)}
      >
        <Typography variant="body1">{featureProperties.description}</Typography>
      </CustomPopover>

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

      {showReview && (
         <MakeReview
          featureId={features.id}
          onClose={() => setShowReview(false)}
          onReviewSubmitted={onReviewSubmitted}
        />
      )}
    </Card>
  );
}
