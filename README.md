import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const courses = {
    'sixWeek': [
      {
        id: '1',
        title: 'Child Minding',
        duration: '6 Weeks',
        price: 'R750',
        description: 'Baby and toddler care, educational toys',
        details: 'Learn essential skills for caring for babies and toddlers including safety protocols and developmental activities.'
      },
      {
        id: '2',
        title: 'Cooking',
        duration: '6 Weeks',
        price: 'R750',
        description: 'Nutrition, healthy meal preparation',
        details: 'Master nutrition basics and healthy meal preparation techniques for balanced meals.'
      },
      {
        id: '3',
        title: 'Garden Maintenance',
        duration: '6 Weeks',
        price: 'R750',
        description: 'Watering, pruning, planting techniques',
        details: 'Learn proper watering techniques, pruning methods, and planting strategies.'
      }
    ],
    'sixMonth': [
      {
        id: '4',
        title: 'First Aid',
        duration: '6 Months',
        price: 'R1500',
        description: 'Basic life support, CPR, emergency management',
        details: 'Comprehensive training in emergency response and life-saving techniques.'
      },
      {
        id: '5',
        title: 'Sewing',
        duration: '6 Months',
        price: 'R1500',
        description: 'Alterations, tailoring, garment design',
        details: 'Develop skills in garment construction, alterations, and creative design.'
      },
      {
        id: '6',
        title: 'Landscaping',
        duration: '6 Months',
        price: 'R1500',
        description: 'Plant knowledge, garden layout',
        details: 'Learn to design, create and maintain beautiful outdoor spaces.'
      },
      {
        id: '7',
        title: 'Life Skills',
        duration: '6 Months',
        price: 'R1500',
        description: 'Literacy, numeracy, banking, labor rights',
        details: 'Essential knowledge for personal development and everyday living.'
      }
    ]
  };

  const openCourseDetails = (course) => {
    setSelectedCourse(course);
    setModalVisible(true);
  };

  const DiscountBadge = ({ count, discount }) => (
    <View style={styles.discountBadge}>
      <Text style={styles.discountCount}>{count} Course{count > 1 ? 's' : ''}</Text>
      <Text style={styles.discountText}>{discount}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#6C63FF" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logo}>
          <Ionicons name="cube" size={28} color="white" />
          <Text style={styles.logoText}>Snack Devs Courses</Text>
        </View>
        <Text style={styles.subtitle}>Empowering the Nation</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Welcome Section */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Welcome to Our Courses!</Text>
          <Text style={styles.welcomeText}>
            Choose from our practical 6-week or comprehensive 6-month courses. 
            Press any button below to view course details.
          </Text>
        </View>

        {/* 6-Week Courses Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6-Week Courses (R750 each)</Text>
          <View style={styles.buttonsContainer}>
            {courses.sixWeek.map((course) => (
              <TouchableOpacity
                key={course.id}
                style={styles.courseButton}
                onPress={() => openCourseDetails(course)}
              >
                <Text style={styles.buttonText}>{course.title}</Text>
                <Text style={styles.buttonSubtext}>{course.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 6-Month Courses Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6-Month Courses (R1500 each)</Text>
          <View style={styles.buttonsContainer}>
            {courses.sixMonth.map((course) => (
              <TouchableOpacity
                key={course.id}
                style={[styles.courseButton, styles.sixMonthButton]}
                onPress={() => openCourseDetails(course)}
              >
                <Text style={styles.buttonText}>{course.title}</Text>
                <Text style={styles.buttonSubtext}>{course.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Discounts Section */}
        <View style={styles.discountSection}>
          <Text style={styles.discountTitle}>Special Discounts</Text>
          <View style={styles.discountsRow}>
            <DiscountBadge count={2} discount="5% OFF" />
            <DiscountBadge count={3} discount="10% OFF" />
            <DiscountBadge count={4} discount="15% OFF" />
          </View>
          <Text style={styles.vatText}>All prices include VAT (15%)</Text>
        </View>

      </ScrollView>

      {/* Course Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedCourse && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedCourse.title}</Text>
                  <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Ionicons name="close" size={24} color="#666" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.modalBody}>
                  <View style={styles.courseInfo}>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Duration:</Text>
                      <Text style={styles.infoValue}>{selectedCourse.duration}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Price:</Text>
                      <Text style={styles.priceValue}>{selectedCourse.price}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Description:</Text>
                      <Text style={styles.infoValue}>{selectedCourse.description}</Text>
                    </View>
                  </View>
                  
                  <Text style={styles.detailsTitle}>Course Details:</Text>
                  <Text style={styles.detailsText}>{selectedCourse.details}</Text>
                  
                  <TouchableOpacity style={styles.enrollButton}>
                    <Text style={styles.enrollButtonText}>Enroll in this Course</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    backgroundColor: '#6C63FF',
    padding: 20,
    paddingTop: 10,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  logoText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 10,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  welcomeCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2A2D3E',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2A2D3E',
    marginBottom: 15,
    marginLeft: 5,
  },
  buttonsContainer: {
    gap: 12,
  },
  courseButton: {
    backgroundColor: '#6C63FF',
    padding: 18,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  sixMonthButton: {
    backgroundColor: '#36D1DC',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
  buttonSubtext: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
  },
  discountSection: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  discountTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2A2D3E',
    marginBottom: 15,
    textAlign: 'center',
  },
  discountsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  discountBadge: {
    backgroundColor: '#F0F2FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 100,
  },
  discountCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2A2D3E',
    marginBottom: 5,
  },
  discountText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6584',
  },
  vatText: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '100%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2A2D3E',
    flex: 1,
  },
  closeButton: {
    padding: 5,
  },
  modalBody: {
    padding: 20,
  },
  courseInfo: {
    backgroundColor: '#F7F9FC',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 16,
    color: '#2A2D3E',
    fontWeight: '600',
  },
  priceValue: {
    fontSize: 18,
    color: '#16a34a',
    fontWeight: '700',
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2A2D3E',
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginBottom: 25,
  },
  enrollButton: {
    backgroundColor: '#6C63FF',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  enrollButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});
