import Carousel from 'react-material-ui-carousel';
import { Paper, Typography } from '@mui/material';

export default function TableCarousel() {
  const items = [
    {
        name: "Registration",
        description: "Register to use tables",
        imageUrl: "./../../public/images/registration.png",
    },
    {
        name: "Intuitive design",
        description: "Easily manage your tables",
        imageUrl: "./../../public/images/creating.png",
    },
    {
        name: "Create table",
        description: "Easily create new ones",
        imageUrl: "./../../public/images/creating.png",
    },
    {
        name: "Edit table",
        description: "Easily edit your tables",
        imageUrl: "./../../public/images/creating.png",
    },
  ];

  return (
    <Carousel>
      {
        items.map((item, i) => (
            <Paper key={i} elevation={2} style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img src={item.imageUrl} alt={item.name} style={{ width: "100%", height: "auto", marginBottom: "20px" }}/>
                <Typography variant="h4">{item.name}</Typography>
                <Typography variant="body1">{item.description}</Typography>
            </Paper>
        ))
      }
    </Carousel>
  );
}
