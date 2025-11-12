
The app below consist of the code below created on snack devs. Key elements was added , such as the images , the layout and the scroll options , changes that was made was the option to tap on certain dishes and be directed to the main menu to find the prices and the image of the dish, another change was the menu button which directs you to the menu for the entire resturant. Added a back to home feature button as well, with contactdetails on the main page and a warm welcome message.

New features added : option to manage your menu and to check the average prices for the chef's menu. Error handling added as well, can not confirm order without entering key details "erro" message will appear on the screen. Emoji's added to display menu items.



import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function ChefApp() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [menuData, setMenuData] = useState([
    {
      title: 'MAIN MEALS',
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
      title: 'STARTERS',
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
      title: 'DESSERTS',
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
  ]);

  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'MAIN MEALS'
  });

  // Function to calculate average prices
  const calculateAveragePrices = () => {
    const averages = {};
    
    menuData.forEach(category => {
      if (category.data.length > 0) {
        const total = category.data.reduce((sum, item) => sum + item.price, 0);
        averages[category.title] = Math.round(total / category.data.length);
      } else {
        averages[category.title] = 0;
      }
    });
    
    return averages;
  };

  // Function to format price in Rands
  const formatPrice = (price) => {
    return `R ${price}`;
  };

  // Function to add new menu item
  const addMenuItem = () => {
    if (!newMenuItem.name || !newMenuItem.description || !newMenuItem.price || !newMenuItem.image) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newItem = {
      id: Date.now(), // Simple ID generation
      name: newMenuItem.name,
      description: newMenuItem.description,
      price: parseInt(newMenuItem.price),
      image: newMenuItem.image,
    };

    // Update menu data
    const updatedMenuData = menuData.map(category => {
      if (category.title === newMenuItem.category) {
        return {
          ...category,
          data: [...category.data, newItem]
        };
      }
      return category;
    });

    setMenuData(updatedMenuData);
    
    // Reset form
    setNewMenuItem({
      name: '',
      description: '',
      price: '',
      image: '',
      category: 'MAIN MEALS'
    });
    
    Alert.alert('Success', 'Menu item added successfully!');
  };

  // Function to remove menu item
  const removeMenuItem = (itemId, categoryTitle) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from the menu?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            const updatedMenuData = menuData.map(category => {
              if (category.title === categoryTitle) {
                return {
                  ...category,
                  data: category.data.filter(item => item.id !== itemId)
                };
              }
              return category;
            });
            setMenuData(updatedMenuData);
          }
        }
      ]
    );
  };

  // Function to render each menu item using for loop
  const renderMenuItems = (items, categoryTitle, showRemoveButton = false) => {
    const itemComponents = [];
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      itemComponents.push(
        <TouchableOpacity 
          key={item.id} 
          style={styles.menuItem}
          activeOpacity={0.7}
        >
          <Image 
            source={{ uri: item.image }} 
            style={styles.menuImage}
          />
          <View style={styles.menuItemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
          </View>
          {showRemoveButton && (
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={() => removeMenuItem(item.id, categoryTitle)}
              activeOpacity={0.8}
            >
              <Text style={styles.removeButtonText}>×</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      );
    }
    
    return itemComponents;
  };

  // Function to render each section using for loop
  const renderMenuSections = (showRemoveButton = false) => {
    const sectionComponents = [];
    
    for (let i = 0; i < menuData.length; i++) {
      const section = menuData[i];
      if (section.data.length > 0) {
        sectionComponents.push(
          <View key={i} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {renderMenuItems(section.data, section.title, showRemoveButton)}
          </View>
        );
      }
    }
    
    return sectionComponents;
  };

  // Home Screen Content
  const renderHomeScreen = () => {
    const averagePrices = calculateAveragePrices();
    
    return (
      <View style={styles.screenContainer}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>Welcome to Christoffels's Kitchen</Text>
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

          {/* Average Prices Section */}
          <View style={styles.averagePriceSection}>
            <Text style={styles.sectionTitle}>Average Prices by Course</Text>
            <View style={styles.averagePriceGrid}>
              {Object.entries(averagePrices).map(([category, average]) => (
                <View key={category} style={styles.averagePriceItem}>
                  <Text style={styles.averageCategory}>{category}</Text>
                  <Text style={styles.averagePrice}>
                    {average > 0 ? formatPrice(average) : 'No items'}
                  </Text>
                  <Text style={styles.averageLabel}>Average</Text>
                </View>
              ))}
            </View>
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

          {/* Navigation Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={styles.menuButton}
              onPress={() => setCurrentScreen('menu')}
              activeOpacity={0.8}
            >
              <Text style={styles.menuButtonText}>View Full Menu →</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.menuButton, styles.manageButton]}
              onPress={() => setCurrentScreen('manage')}
              activeOpacity={0.8}
            >
              <Text style={styles.menuButtonText}>Manage Menu 🛠️</Text>
            </TouchableOpacity>
          </View>

          {/* Contact Info */}
          <View style={styles.contactSection}>
            <Text style={styles.contactTitle}>Visit Us</Text>
            <Text style={styles.contactText}>123 Flavor Street, Cape Town</Text>
            <Text style={styles.contactText}>+27 71 123 4567</Text>
            <Text style={styles.contactText}>Open: Wed-Sun 12:00 - 21:00</Text>
          </View>
        </ScrollView>

        {/* Always Visible Back Button */}
        <TouchableOpacity 
          style={styles.floatingBackButton}
          onPress={() => setCurrentScreen('home')}
          activeOpacity={0.8}
        >
          <Text style={styles.floatingBackButtonText}>🏠 Home</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Menu Screen Content
  const renderMenuScreen = () => (
    <View style={styles.screenContainer}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.menuScrollContent}
      >
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
      </ScrollView>

      {/* Always Visible Back Button */}
      <TouchableOpacity 
        style={styles.floatingBackButton}
        onPress={() => setCurrentScreen('home')}
        activeOpacity={0.8}
      >
        <Text style={styles.floatingBackButtonText}>🏠 Home</Text>
      </TouchableOpacity>
    </View>
  );

  // Manage Menu Screen Content
  const renderManageMenuScreen = () => (
    <View style={styles.screenContainer}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.manageScrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Manage Menu Items</Text>
          <Text style={styles.headerSubtitle}>Add or remove items from your menu</Text>
        </View>

        {/* Add New Item Form */}
        <View style={styles.formSection}>
          <Text style={styles.formTitle}>Add New Menu Item</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={newMenuItem.name}
            onChangeText={(text) => setNewMenuItem({...newMenuItem, name: text})}
          />
          
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            value={newMenuItem.description}
            onChangeText={(text) => setNewMenuItem({...newMenuItem, description: text})}
            multiline
          />
          
          <TextInput
            style={styles.input}
            placeholder="Price (e.g., 285)"
            value={newMenuItem.price}
            onChangeText={(text) => setNewMenuItem({...newMenuItem, price: text})}
            keyboardType="numeric"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Image URL"
            value={newMenuItem.image}
            onChangeText={(text) => setNewMenuItem({...newMenuItem, image: text})}
          />
          
          <View style={styles.categorySelector}>
            <Text style={styles.categoryLabel}>Category:</Text>
            <View style={styles.categoryButtons}>
              {['MAIN MEALS', 'STARTERS', 'DESSERTS'].map(category => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    newMenuItem.category === category && styles.categoryButtonActive
                  ]}
                  onPress={() => setNewMenuItem({...newMenuItem, category})}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.categoryButtonText,
                    newMenuItem.category === category && styles.categoryButtonTextActive
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity 
            style={styles.addButton} 
            onPress={addMenuItem}
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonText}>Add to Menu</Text>
          </TouchableOpacity>
        </View>

        {/* Current Menu Items with Remove Option */}
        <View style={styles.manageSection}>
          <Text style={styles.sectionTitle}>Current Menu Items</Text>
          <Text style={styles.sectionSubtitle}>Tap × to remove items</Text>
          {renderMenuSections(true)}
        </View>
      </ScrollView>

      {/* Always Visible Back Button */}
      <TouchableOpacity 
        style={styles.floatingBackButton}
        onPress={() => setCurrentScreen('home')}
        activeOpacity={0.8}
      >
        <Text style={styles.floatingBackButtonText}>🏠 Home</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Navigation Header - Fixed at top */}
      <View style={styles.navHeader}>
        <TouchableOpacity 
          style={[styles.navButton, currentScreen === 'home' && styles.activeNavButton]}
          onPress={() => setCurrentScreen('home')}
          activeOpacity={0.7}
        >
          <Text style={[styles.navButtonText, currentScreen === 'home' && styles.activeNavButtonText]}>
            🏠 Home
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navButton, currentScreen === 'menu' && styles.activeNavButton]}
          onPress={() => setCurrentScreen('menu')}
          activeOpacity={0.7}
        >
          <Text style={[styles.navButtonText, currentScreen === 'menu' && styles.activeNavButtonText]}>
            📋 Menu
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navButton, currentScreen === 'manage' && styles.activeNavButton]}
          onPress={() => setCurrentScreen('manage')}
          activeOpacity={0.7}
        >
          <Text style={[styles.navButtonText, currentScreen === 'manage' && styles.activeNavButtonText]}>
            ⚙️ Manage
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        {currentScreen === 'home' && renderHomeScreen()}
        {currentScreen === 'menu' && renderMenuScreen()}
        {currentScreen === 'manage' && renderManageMenuScreen()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  mainContent: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    position: 'relative',
  },
  navHeader: {
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    zIndex: 1000,
  },
  navButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: 'white',
    minHeight: 60,
    justifyContent: 'center',
  },
  activeNavButton: {
    backgroundColor: '#e74c3c',
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7f8c8d',
  },
  activeNavButtonText: {
    color: 'white',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Extra space for floating button
  },
  menuScrollContent: {
    padding: 16,
    paddingBottom: 100, // Extra space for floating button
  },
  manageScrollContent: {
    padding: 16,
    paddingBottom: 100, // Extra space for floating button
  },
  scrollView: {
    flex: 1,
  },
  // Floating Back Button
  floatingBackButton: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    backgroundColor: '#e74c3c',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    zIndex: 100,
  },
  floatingBackButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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
  // Average Prices Section
  averagePriceSection: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  averagePriceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  averagePriceItem: {
    width: '48%',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 10,
  },
  averageCategory: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 5,
  },
  averagePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: 2,
  },
  averageLabel: {
    fontSize: 12,
    color: '#7f8c8d',
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  menuButton: {
    flex: 1,
    backgroundColor: '#e74c3c',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minHeight: 55,
    justifyContent: 'center',
  },
  manageButton: {
    backgroundColor: '#3498db',
  },
  menuButtonText: {
    color: 'white',
    fontSize: 16,
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
    textAlign: 'center',
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
    position: 'relative',
    minHeight: 110,
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
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#e74c3c',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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
  // Manage Menu Styles
  formSection: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
    minHeight: 50,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  categorySelector: {
    marginBottom: 20,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#e9ecef',
    minHeight: 50,
    justifyContent: 'center',
  },
  categoryButtonActive: {
    backgroundColor: '#e74c3c',
    borderColor: '#e74c3c',
  },
  categoryButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7f8c8d',
    textAlign: 'center',
  },
  categoryButtonTextActive: {
    color: 'white',
  },
  addButton: {
    backgroundColor: '#27ae60',
    padding: 18,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minHeight: 60,
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  manageSection: {
    marginBottom: 20,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 15,
  },
});
