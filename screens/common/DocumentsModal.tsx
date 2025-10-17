import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface Document {
  id: string;
  name: string;
  description: string;
  isUploaded: boolean;
  uri?: string;
}

interface DocumentsModalProps {
  visible: boolean;
  onClose: () => void;
  tenantName?: string;
}

const DocumentsModal: React.FC<DocumentsModalProps> = ({
  visible,
  onClose,
  tenantName = 'Tenant',
}) => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'ID Proof',
      description: 'Any Govt. ID',
      isUploaded: true,
      uri: undefined // In real app, this would be the file URI
    },
    {
      id: '2',
      name: 'Rental Agreement',
      description: 'Upload tenant agreement',
      isUploaded: true,
      uri: undefined
    },
    {
      id: '3',
      name: 'Police Verification',
      description: 'Upload Police Verification',
      isUploaded: false,
    },
    {
      id: '4',
      name: 'Other Document',
      description: 'Other Important doc.',
      isUploaded: false,
    },
  ]);

  const handleUpload = async (documentId: string) => {
    try {      
      setDocuments(prevDocs =>
        prevDocs.map(doc =>
          doc.id === documentId
            ? { ...doc, isUploaded: true, uri: 'uploaded-document-uri' }
            : doc
        )
      );

      console.log('Document uploaded successfully for ID:', documentId);
    } catch (error) {
      console.error('Document upload error:', error);
    }
  };

  const handleDownload = async (document: Document) => {
    try {
      console.log(`${document.name} downloaded successfully!`);
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  const renderDocumentItem = (document: Document) => {
    return (
      <View key={document.id} style={styles.documentItem}>
        <View style={styles.documentInfo}>
          <Text style={styles.documentName}>{document.name}</Text>
          <Text style={styles.documentDescription}>{document.description}</Text>
        </View>
        
        <TouchableOpacity
          style={[
            styles.actionButton,
            document.isUploaded ? styles.downloadButton : styles.uploadButton
          ]}
          onPress={() =>
            document.isUploaded
              ? handleDownload(document)
              : handleUpload(document.id)
          }
        >
          <Text
            style={[
              styles.actionButtonText,
              document.isUploaded ? styles.downloadButtonText : styles.uploadButtonText
            ]}
          >
            {document.isUploaded ? 'Download' : 'Upload'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <View style={styles.closeCircle}>
              <Text style={styles.closeX}>×</Text>
            </View>
          </TouchableOpacity>

          {/* Content Container */}
          <View style={styles.contentContainer}>
            {/* Title */}
            <Text style={styles.modalTitle}>Legal Documents :</Text>

            {/* Documents List */}
            <View style={styles.documentsContainer}>
              {documents.map(renderDocumentItem)}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: Math.max(20, screenWidth * 0.05),
    borderTopRightRadius: Math.max(20, screenWidth * 0.05),
    padding: Math.max(20, screenWidth * 0.05),
    paddingBottom: Math.max(120, screenHeight * 0.15),
    minHeight: Math.max(420, screenHeight * 0.5),
    maxHeight: screenHeight * 0.85,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  closeButton: {
    alignSelf: 'center',
    marginBottom: Math.max(32, screenHeight * 0.04),
  },
  closeCircle: {
    width: Math.max(36, screenWidth * 0.09),
    height: Math.max(36, screenWidth * 0.09),
    borderRadius: Math.max(18, screenWidth * 0.045),
    borderWidth: 2,
    borderColor: '#FED232',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  closeX: {
    fontSize: Math.max(24, screenWidth * 0.06),
    color: '#FED232',
    fontWeight: 'bold',
  },
  contentContainer: {
    backgroundColor: '#fff',
    borderRadius: Math.max(12, screenWidth * 0.03),
    paddingHorizontal: Math.max(16, screenWidth * 0.05),
    paddingVertical: Math.max(16, screenHeight * 0.02),
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  modalTitle: {
    fontSize: Math.max(18, screenWidth * 0.045),
    fontWeight: '600',
    color: '#000000',
    marginBottom: Math.max(20, screenHeight * 0.025),
    fontFamily: 'Montserrat-SemiBold',
  },
  documentsContainer: {
    gap: Math.max(12, screenHeight * 0.015),
  },
  documentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: Math.max(8, screenWidth * 0.02),
    padding: Math.max(16, screenWidth * 0.04),
    borderWidth: 0.7,
    borderColor: '#909090',
  },
  documentInfo: {
    flex: 1,
    marginRight: Math.max(12, screenWidth * 0.03),
  },
  documentName: {
    fontSize: Math.max(14, screenWidth * 0.04),
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
    fontFamily: 'Inter-Bold',
  },
  documentDescription: {
    fontSize: Math.max(14, screenWidth * 0.035),
    color: '#000000',
    fontFamily: 'OpenSans-Regular',
  },
  actionButton: {
    paddingHorizontal: Math.max(20, screenWidth * 0.05),
    paddingVertical: Math.max(8, screenHeight * 0.01),
    borderRadius: Math.max(18, screenWidth * 0.015),
    minWidth: Math.max(80, screenWidth * 0.2),
    alignItems: 'center',
  },
  downloadButton: {
    backgroundColor: '#E8F5E8',
    borderWidth: 1,
    borderColor: '#33B94D',
  },
  uploadButton: {
    backgroundColor: '#FFF3E0',
    borderWidth: 1,
    borderColor: '#FF0000',
  },
  actionButtonText: {
    fontSize: Math.max(14, screenWidth * 0.035),
    fontWeight: '600',
    fontFamily: 'OpenSans-Regular',
    zIndex: 1,
  },
  downloadButtonText: {
    color: '#000000',
  },
  uploadButtonText: {
    color: '#000000',
  },
});

export default DocumentsModal;