import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, Image, Dimensions, Alert, ScrollView } from 'react-native';

export default function App() {
  const [alcool, setAlcool] = useState('');
  const [gasolina, setGasolina] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const calcular = () => {
    const valorAlcool = parseFloat(alcool.replace(',', '.'));
    const valorGasolina = parseFloat(gasolina.replace(',', '.'));

    if (isNaN(valorAlcool) || isNaN(valorGasolina) || valorAlcool <= 0 || valorGasolina <= 0) {
      Alert.alert('Erro', 'Preencha os dois valores corretamente.');
    } else {
      const proporcao = valorAlcool / valorGasolina;
      if (proporcao < 0.7) {
        setMensagem(`Álcool é mais vantajoso!\nProporção: ${proporcao.toFixed(2)}`);
      } else {
        setMensagem(`Gasolina é mais vantajosa!\nProporção: ${proporcao.toFixed(2)}`);
      }
      setModalVisible(true);
    }
  };

  const fecharModal = () => {
    setModalVisible(false);
  };

  const { width, height } = Dimensions.get('window');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Pikeno Ipirantininga</Text>

      <Image
        source={{ uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/bomba-de-gas-4509366-3733001.png?f=webp' }}
        style={styles.imagem}
      />



      <TextInput
        style={styles.input}
        placeholder="Preço do Álcool (ex: 3.29)"
        keyboardType="numeric"
        value={alcool}
        onChangeText={setAlcool}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço da Gasolina (ex: 4.92)"
        keyboardType="numeric"
        value={gasolina}
        onChangeText={setGasolina}
      />

      <TouchableOpacity style={styles.botao} onPress={calcular}>
        <Text style={styles.textoBotao}>Calcular</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalBackground}>
          <View style={[styles.modalBox, { width: width * 0.8, height: height * 0.3 }]}>
            <Text style={styles.resultado}>{mensagem}</Text>
            <TouchableOpacity style={styles.botaoFechar} onPress={fecharModal}>
              <Text style={styles.textoBotaoFechar}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF0000',
    marginBottom: 20,
  },
  imagem: {
    width: 200,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: '#FF0000',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 15,
    color: '#FF0000',
  },
  botao: {
    backgroundColor: '#FF0000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBox: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultado: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF0000',
    textAlign: 'center',
    marginBottom: 20,
  },
  botaoFechar: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  textoBotaoFechar: {
    color: '#FF0000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
