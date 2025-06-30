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
import { getFeatureProperties } from '@/utilities/getFeatureProperties';
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
  const [openDialog, setOpenDialog] = React.useState(false);
  const [anchorElName, setAnchorElName] = React.useState<HTMLElement | null>(null);
  const [anchorElDesc, setAnchorElDesc] = React.useState<HTMLElement | null>(null);
  const [isNameTruncated, setIsNameTruncated] = React.useState(false);
  const [isDescTruncated, setIsDescTruncated] = React.useState(false);
  const featureProperties = getFeatureProperties(features, selectedCategory);
  const nameRef = React.useRef<HTMLSpanElement>(null);
  const descRef = React.useRef<HTMLSpanElement>(null);

  // Handle truncation detection for title and description
  React.useEffect(() => {
    const elName = nameRef.current;
    if (elName) setIsNameTruncated(elName.scrollWidth > elName.clientWidth + 2);
    const elDesc = descRef.current;
    if (elDesc) setIsDescTruncated(elDesc.scrollHeight > elDesc.clientHeight + 2);
  }, [featureProperties.name, featureProperties.description]);

  const handleExpandClick = () => {
    setExpanded((prev) => !prev);
  };

  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setFavorited((prev) => !prev);
  };

  const handleButtonClick = () => {
    console.log('Button clicked');
  };

  const handleDescriptionClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isDescTruncated) {
      setAnchorElDesc(event.currentTarget);
    }
  };

  const handleTitleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isNameTruncated) {
      setAnchorElName(event.currentTarget);
    }
  };

  const handleDialogClose = () => setOpenDialog(false);

  // Check if the feature has a valid external link (website)
  const website = featureProperties.website;
  const hasExternalLink = typeof website === 'string' && website.length > 0;

  const handleVisitSiteClick = () => {
    // Only open the link if it is a valid string
    if (hasExternalLink) {
      window.open(website, '_blank'); // Open the external link in a new tab
    }
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
            flexGrow: 1, // Ensure the content takes up remaining space, pushing the button down
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center', // Aligns the title and rating horizontally
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
              cursor: isNameTruncated ? 'pointer' : 'default',
              display: '-webkit-box',
              WebkitLineClamp: 1, // Limit title to 1 line
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            ref={nameRef}
            onClick={handleTitleClick}
          >
            {featureProperties.name}
          </Typography>

          <MoreVertIcon fontSize="small" />

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
            {featureProperties.address ? featureProperties.address : 'Address not provided'}
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

      {/* Button at the bottom of the card */}
      <CardActions
        disableSpacing
        sx={{
          display: 'flex',
          justifyContent: 'space-between', // Ensure elements are spaced apart
          padding: '0.5rem 1rem',
          marginTop: 'auto', // Ensure the button is pushed to the bottom
        }}
      >
        <button
          onClick={handleButtonClick}
          style={{
            backgroundColor: '#1c191b',
            color: 'white',
            borderRadius: '50px',
            width: '50%',
            height: '40px',
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.3s ease',
            border: '1px solid #1c191b',
            marginBottom: '10px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = '#1c191b';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#1c191b';
            e.currentTarget.style.color = 'white';
          }}
          className="text-white focus:outline-none font-medium rounded-full border-1 border-[1c191b] text-sm text-center transition duration-200 flex justify-center gap-2"
        >
          Learn More
        </button>

        {/* Star Rating with Score */}
        <Rate rate={0} /> {/* Display rate with a score of 0 */}
      </CardActions>

      {/* Popovers for title and description */}
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
    </Card>
  );
}
