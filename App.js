import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ChefApp() {
  const [currentScreen, setCurrentScreen] = useState('home');

  // Menu data organized by categories
  const menuData = [
    {
      title: ' MAIN MEALS',
      data: [
        {
          id: 1,
          name: 'Braised Oxtail',
          description: 'Slow-cooked oxtail with root vegetables in rich gravy',
          price: 285,
          image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300'
        },
        {
          id: 2,
          name: 'Bobotie',
          description: 'Traditional Cape Malay spiced minced meat bake with egg topping',
          price: 195,
          image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=300'
        }
      ]
    },
    {
      title: ' STARTERS',
      data: [
        {
          id: 3,
          name: 'Springbok Carpaccio',
          description: 'Thinly sliced springbok with olive oil and herbs',
          price: 125,
          image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300'
        },
        {
          id: 4,
          name: 'Smoked Snoek Pâté',
          description: 'Creamy smoked fish pâté with melba toast',
          price: 95,
          image: 'https://images.unsplash.com/photo-1565299585323-38174c13fae8?w=300'
        }
      ]
    },
    {
      title: ' DESSERTS',
      data: [
        {
          id: 5,
          name: 'Malva Pudding',
          description: 'Traditional sweet apricot pudding with custard',
          price: 85,
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300'
        },
        {
          id: 6,
          name: 'Koeksisters',
          description: 'Traditional Afrikaans sweet, syrupy plaited doughnuts',
          price: 65,
          image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300'
        },
        {
          id: 7,
          name: 'Cape Brandy Pudding',
          description: 'Rich brandy-infused date pudding with cream',
          price: 95,
          image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300'
        }
      ]
    }
  ];

  // Function to format price in Rands
  const formatPrice = (price) => {
    return `R ${price}`;
  };

  // Function to render each menu item using for loop
  const renderMenuItems = (items) => {
    const itemComponents = [];
    
    // Using for loop to create menu items
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      itemComponents.push(
        <View key={item.id} style={styles.menuItem}>
          <Image 
            source={{ uri: item.image }} 
            style={styles.menuImage}
          />
          <View style={styles.menuItemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
          </View>
        </View>
      );
    }
    
    return itemComponents;
  };

  // Function to render each section using for loop
  const renderMenuSections = () => {
    const sectionComponents = [];
    
    for (let i = 0; i < menuData.length; i++) {
      const section = menuData[i];
      sectionComponents.push(
        <View key={i} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {renderMenuItems(section.data)}
        </View>
      );
    }
    
    return sectionComponents;
  };

  // Home Screen Content
  const renderHomeScreen = () => (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}> Welcome to Christoffels's Kitchen</Text>
        <Text style={styles.welcomeSubtitle}>Authentic African & International Cuisine</Text>
        
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400' }}
          style={styles.chefImage}
        />
        
        <Text style={styles.welcomeText}>
          Experience the finest culinary delights prepared with passion and expertise. 
          Our chef combines traditional recipes with modern techniques to create 
          unforgettable dining experiences.
        </Text>
      </View>

      {/* Featured Items */}
      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>Today's Specials</Text>
        
        <View style={styles.featuredGrid}>
          <View style={styles.featuredItem}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200' }}
              style={styles.featuredImage}
            />
            <Text style={styles.featuredText}>Braised Oxtail</Text>
            <Text style={styles.featuredPrice}>R 285</Text>
          </View>
          
          <View style={styles.featuredItem}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200' }}
              style={styles.featuredImage}
            />
            <Text style={styles.featuredText}>Malva Pudding</Text>
            <Text style={styles.featuredPrice}>R 85</Text>
          </View>
        </View>
      </View>

      {/* Navigation Button */}
      <TouchableOpacity 
        style={styles.menuButton}
        onPress={() => setCurrentScreen('menu')}
      >
        <Text style={styles.menuButtonText}>View Full Menu →</Text>
      </TouchableOpacity>

      {/* Contact Info */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Visit Us</Text>
        <Text style={styles.contactText}> 123 Flavor Street, Cape Town</Text>
        <Text style={styles.contactText}> +27 71 123 4567</Text>
        <Text style={styles.contactText}> Open: Wed-Sun 12:00 - 21:00</Text>
      </View>
    </ScrollView>
  );

  // Menu Screen Content
  const renderMenuScreen = () => (
    <ScrollView style={styles.scrollView}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chef Christoffels's Menu</Text>
        <Text style={styles.headerSubtitle}>All prices in South African Rands (ZAR)</Text>
      </View>

      {/* Menu Sections */}
      {renderMenuSections()}

      {/* Footer Note */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          🥘 All dishes prepared fresh daily{'\n'}
          🌱 Vegetarian options available{'\n'}
          🔥 Spice levels adjustable to preference
        </Text>
      </View>

      {/* Back to Home Button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => setCurrentScreen('home')}
      >
        <Text style={styles.backButtonText}>← Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Navigation Header */}
      <View style={styles.navHeader}>
        <TouchableOpacity 
          style={[styles.navButton, currentScreen === 'home' && styles.activeNavButton]}
          onPress={() => setCurrentScreen('home')}
        >
          <Text style={[styles.navButtonText, currentScreen === 'home' && styles.activeNavButtonText]}>
            Home
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navButton, currentScreen === 'menu' && styles.activeNavButton]}
          onPress={() => setCurrentScreen('menu')}
        >
          <Text style={[styles.navButtonText, currentScreen === 'menu' && styles.activeNavButtonText]}>
            Menu
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      {currentScreen === 'home' ? renderHomeScreen() : renderMenuScreen()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  navHeader: {
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  activeNavButton: {
    backgroundColor: '#e74c3c',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7f8c8d',
  },
  activeNavButtonText: {
    color: 'white',
  },
  scrollContent: {
    padding: 20,
  },
  scrollView: {
    padding: 16,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#7f8c8d',
    marginBottom: 20,
  },
  chefImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    color: '#34495e',
  },
  featuredSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },
  featuredGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  featuredItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  featuredImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  featuredText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 5,
  },
  featuredPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  menuButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactSection: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  contactText: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 5,
    textAlign: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  menuImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  menuItemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
    lineHeight: 18,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  footer: {
    backgroundColor: '#34495e',
    padding: 20,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 20,
  },
  footerText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  backButton: {
    backgroundColor: '#95a5a6',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});