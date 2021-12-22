-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: CookingRecipePortalDB_2
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Category` (
  `CategoryID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `description` varchar(200) NOT NULL,
  `User_UserID` int NOT NULL,
  PRIMARY KEY (`CategoryID`),
  KEY `fk_Category_User1_idx` (`User_UserID`),
  CONSTRAINT `fk_Category_User1` FOREIGN KEY (`User_UserID`) REFERENCES `User` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `Category` VALUES (2,'Meat','unhealty but it gets you stronger.',22),(3,'Vegetables','Very healthy choice',24),(4,'Liquid','some of the liquids are bad',22),(6,'Fish','healthy in the sea',28),(7,'Spicy','hot and spicy makes your tongue itchy.',22);
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ingredient`
--

DROP TABLE IF EXISTS `Ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Ingredient` (
  `RecipeID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `User_UserID` int NOT NULL,
  `Meal_MealID` int DEFAULT NULL,
  PRIMARY KEY (`RecipeID`),
  KEY `fk_Ingredient_User1_idx` (`User_UserID`),
  KEY `fk_Ingredient_Meal1_idx` (`Meal_MealID`),
  CONSTRAINT `fk_Ingredient_Meal1` FOREIGN KEY (`Meal_MealID`) REFERENCES `Meal` (`MealID`),
  CONSTRAINT `fk_Ingredient_User1` FOREIGN KEY (`User_UserID`) REFERENCES `User` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ingredient`
--

LOCK TABLES `Ingredient` WRITE;
/*!40000 ALTER TABLE `Ingredient` DISABLE KEYS */;
INSERT INTO `Ingredient` VALUES (18,'chicken',22,20),(19,'mash',24,20),(20,'sauce',24,21),(23,'hot sauce',22,20),(24,'Spice Mile',22,20),(25,'Dark Chocolate',24,22),(26,'Pepper',26,22),(27,'Oil',22,20),(28,'water',22,20),(29,'soy sauce',26,22),(30,'lemon juice',28,20),(31,'Pepper Mild',28,21),(32,'Juice',22,21);
/*!40000 ALTER TABLE `Ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Meal`
--

DROP TABLE IF EXISTS `Meal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Meal` (
  `MealID` int NOT NULL AUTO_INCREMENT,
  `regionCountry` char(45) NOT NULL,
  `name` char(45) NOT NULL,
  `servingSizes` int NOT NULL,
  `author` char(45) NOT NULL,
  `expirationDate` int NOT NULL,
  `User_UserID` int NOT NULL,
  `Category_CategoryID` int DEFAULT NULL,
  `Rating_RatingID` int DEFAULT NULL,
  `Meal_InfoType_Meal_InfoTypeID` int DEFAULT NULL,
  `Meal_numberSource_Meal_numberSourceID` int DEFAULT NULL,
  PRIMARY KEY (`MealID`),
  KEY `fk_Meal_User1_idx` (`User_UserID`),
  KEY `fk_Meal_Category1_idx` (`Category_CategoryID`),
  KEY `fk_Meal_Rating1_idx` (`Rating_RatingID`),
  KEY `fk_Meal_Meal_InfoType1_idx` (`Meal_InfoType_Meal_InfoTypeID`),
  KEY `fk_Meal_Meal_numberSource1_idx` (`Meal_numberSource_Meal_numberSourceID`),
  CONSTRAINT `fk_Meal_Category1` FOREIGN KEY (`Category_CategoryID`) REFERENCES `Category` (`CategoryID`),
  CONSTRAINT `fk_Meal_Meal_InfoType1` FOREIGN KEY (`Meal_InfoType_Meal_InfoTypeID`) REFERENCES `Meal_InfoType` (`Meal_InfoTypeID`),
  CONSTRAINT `fk_Meal_Meal_numberSource1` FOREIGN KEY (`Meal_numberSource_Meal_numberSourceID`) REFERENCES `Meal_numberSource` (`Meal_numberSourceID`),
  CONSTRAINT `fk_Meal_Rating1` FOREIGN KEY (`Rating_RatingID`) REFERENCES `Rating` (`RatingID`),
  CONSTRAINT `fk_Meal_User1` FOREIGN KEY (`User_UserID`) REFERENCES `User` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Meal`
--

LOCK TABLES `Meal` WRITE;
/*!40000 ALTER TABLE `Meal` DISABLE KEYS */;
INSERT INTO `Meal` VALUES (20,'China','Chow Mein',30,'Adele',8600000,22,2,1,1,1),(21,'America','Sweet Drink',10,'Adele',8300000,22,NULL,NULL,NULL,NULL),(22,'America','Steak Cheese',9,'Truman',8300000,24,2,4,2,3),(24,'America','Sushi',8,'Javier',1900000,26,7,5,3,2),(25,'America','Sandwich Cheese Mane',8,'Marie',3800000,28,7,2,4,4),(26,'America','Chocolate Sandwich',9,'Adele',2000000,22,NULL,NULL,NULL,NULL),(27,'American','Shrimp Salsa',8,'Javier',4000000,26,3,6,5,5),(28,'Japan','Chicken Curry',10,'Javier',8900000,26,NULL,NULL,NULL,NULL),(29,'Korean','Rice Beef',10,'Adele',8400000,22,2,3,6,6),(30,'American','Burger',3,'Ly',8400000,29,2,NULL,NULL,NULL),(31,'American','Fried Egg',9,'Adele',8300000,22,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Meal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Meal_InfoType`
--

DROP TABLE IF EXISTS `Meal_InfoType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Meal_InfoType` (
  `Meal_InfoTypeID` int NOT NULL AUTO_INCREMENT,
  `cuisineType` varchar(100) DEFAULT NULL,
  `mealType` varchar(100) DEFAULT NULL,
  `dishType` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Meal_InfoTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Meal_InfoType`
--

LOCK TABLES `Meal_InfoType` WRITE;
/*!40000 ALTER TABLE `Meal_InfoType` DISABLE KEYS */;
INSERT INTO `Meal_InfoType` VALUES (1,'Chinese','lunch','main course'),(2,'American','lunch','main course'),(3,'Japanese','lunch','main course'),(4,'American','breakfast','main course'),(5,'Chinese','lunch','main course'),(6,'Japan','lunch','main course'),(7,'Korean','dinner','main course');
/*!40000 ALTER TABLE `Meal_InfoType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Meal_numberSource`
--

DROP TABLE IF EXISTS `Meal_numberSource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Meal_numberSource` (
  `Meal_numberSourceID` int NOT NULL AUTO_INCREMENT,
  `MealSourceTotal` int DEFAULT NULL,
  PRIMARY KEY (`Meal_numberSourceID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Meal_numberSource`
--

LOCK TABLES `Meal_numberSource` WRITE;
/*!40000 ALTER TABLE `Meal_numberSource` DISABLE KEYS */;
INSERT INTO `Meal_numberSource` VALUES (1,1000),(2,1500),(3,980),(4,1999),(5,1460),(6,289),(7,900);
/*!40000 ALTER TABLE `Meal_numberSource` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Rating`
--

DROP TABLE IF EXISTS `Rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rating` (
  `RatingID` int NOT NULL AUTO_INCREMENT,
  `difficulties` int NOT NULL,
  `User_UserID` int NOT NULL,
  PRIMARY KEY (`RatingID`),
  KEY `fk_Rating_User1_idx` (`User_UserID`),
  CONSTRAINT `fk_Rating_User1` FOREIGN KEY (`User_UserID`) REFERENCES `User` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rating`
--

LOCK TABLES `Rating` WRITE;
/*!40000 ALTER TABLE `Rating` DISABLE KEYS */;
INSERT INTO `Rating` VALUES (1,9,22),(2,5,24),(3,8,28),(4,3,24),(5,8,22),(6,2,28);
/*!40000 ALTER TABLE `Rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `age` int NOT NULL,
  `nationality` varchar(45) NOT NULL,
  `password` varchar(300) NOT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (22,'Adele','Wu',21,'American','$2b$10$hMOJqXdD6yhc4bBHiivVnu1eNXQzT0IqeDtvboXtV1xRdBrYBeJqK'),(24,'Truman','Tang',15,'American','$2b$10$E15ZcezhTe1gKi94oPNqtO1trOA5blPilb32QTeKkFzrUzpDcRMdS'),(26,'Javier','Marquez',32,'Filipino-Peru','$2b$10$82i4cuNSbwRnrDUur/QeDeXUhJfLcktFUJzgizCliALqUWsa1hRD.'),(28,'Marie','Justo',20,'Filipina','$2b$10$nLlwH1GakK2LfS/cRSjd0.w8YUCGIRIZQ4cXTeisAXE0aJU5RnD1W'),(29,'Ly','Nguyen',24,'Vietnamese','$2b$10$TaDPV/IOf1ozR.eFzX7qne0UX93mwr/N2fn1u4RYR1pNISrtdjCBC'),(31,'Leslie','Zhou',21,'American','$2b$10$woBGIfN4H9u46YdCGVrnTuv7VVGW4OtTo630g2Lvm/ltTj0GSqVpq');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-22  1:09:00
