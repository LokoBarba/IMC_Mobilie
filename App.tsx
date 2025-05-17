import React, { useState } from 'react';
import { StyleSheet,Text,TextInput,View,TouchableOpacity,KeyboardAvoidingView,Platform} from 'react-native';

export default function App(): JSX.Element {
  const [peso, setPeso] = useState<string>('');
  const [altura, setAltura] = useState<string>('');
  const [imc, setImc] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState<string>('');

  const calcularIMC = (): void => {
    const pesoNum = parseFloat(peso.replace(',', '.'));
    const alturaNum = parseFloat(altura.replace(',', '.'));

    if (!pesoNum || !alturaNum) {
      setImc(null);
      setMensagem('Por favor, insira peso e altura válidos.');
      return;
    }

    const imcCalculado = pesoNum / (alturaNum * alturaNum);
    setImc(imcCalculado.toFixed(2));
    setMensagem(classificarIMC(imcCalculado));
  };

  const classificarIMC = (imc: number): string => {
    if (imc < 18.5) return 'Abaixo do peso';
    if (imc >= 18.5 && imc <= 24.99) return 'Peso ideal';
    if (imc >= 25 && imc <= 29.99) return 'Levemente acima do peso';
    if (imc >= 30 && imc <= 34.99) return 'Obesidade grau I';
    if (imc >= 35 && imc <= 39.99) return 'Obesidade grau II (severa)';
    return 'Obesidade grau III (mórbida)';
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Calculadora de IMC</Text>

      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />

      <TextInput
        style={styles.input}
        placeholder="Altura (m)"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />

      <TouchableOpacity style={styles.button} onPress={calcularIMC}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      {imc && (
        <View style={styles.resultContainer}>
          <Text style={styles.imcText}>Seu IMC é: {imc}</Text>
          <Text style={styles.mensagemText}>{mensagem}</Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#4682B4',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  imcText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  mensagemText: {
    fontSize: 20,
    color: '#FF6347',
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },
});
