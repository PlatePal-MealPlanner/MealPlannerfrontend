import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import backgroundImage from "../assets/leafbg.png"; // Background image
import NavBar from "../components/NavBar"; // NavBar component

const MealPlan = () => {
  const [mealPlans, setMealPlans] = useState([]); // State for meal plans
  const [loading, setLoading] = useState(true); // Loading indicator
  const [error, setError] = useState(null); // Error state

  // Fetch meal plans from the backend
  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const token = localStorage.getItem("token"); // Adjust according to your storage logic
        const response = await axios.get("http://localhost:8080/api/meal-plans", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMealPlans(response.data);
        
      } catch (error) {
        console.error("Error fetching meal plans:", error);
        setError("Failed to fetch meal plans. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMealPlans();
  }, []);

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NavBar />
      <Container
        sx={{
          textAlign: "center",
          paddingTop: "20px",
        }}
      >
        <Typography variant="h3" component="h1" sx={{ fontWeight: "bold", mb: 2 }}>
          Meal Plan
        </Typography>
        <Typography
          variant="body1"
          sx={{
            maxWidth: "600px",
            margin: "0 auto",
            mb: 4,
            fontSize: "1.2rem",
          }}
        >
          Welcome to your personalized meal plan. Here you can organize meals for your week.
        </Typography>

        {/* Loading Indicator */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress color="inherit" />
          </Box>
        )}

        {/* Error Handling */}
        {error && (
          <Typography color="error" sx={{ mt: 4 }}>
            {error}
          </Typography>
        )}

        {/* Meal Plans List */}
        {!loading && !error && mealPlans.length > 0 ? (
          <List sx={{ maxWidth: 600, margin: "0 auto", textAlign: "left" }}>
            {mealPlans.map((mealPlan) => (
              <ListItem
                key={mealPlan.mealPlanId}
                sx={{
                  backgroundColor: "#ffe0b2",
                  marginBottom: "8px",
                  borderRadius: "4px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={`http://localhost:8080/api/recipe/images/${mealPlan.dish?.imagePath || ""}`}
                    alt={mealPlan.dish?.title || "Dish Image"}
                    sx={{ width: 56, height: 56 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={mealPlan.dish?.title || "Dish Name Not Available"}
                  secondary={`Meal Date: ${
                    mealPlan.mealDate
                      ? new Date(mealPlan.mealDate).toLocaleDateString()
                      : "No Date Provided"
                  }`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          !loading &&
          !error && (
            <Typography color="textSecondary" sx={{ mt: 4 }}>
              No meal plans found.
            </Typography>
          )
        )}
      </Container>
    </Box>
  );
};

export default MealPlan;
