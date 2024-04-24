import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const PrivacyPolicyScreen = () => {
  return (
    <>
      <ScrollView style={[styles.container, {backgroundColor: '#3AC0A0'}]}>
        <View style={styles.titleArea}>
          <FontAwesome5
            name={'lock'}
            size={30}
            color="#fff"
            style={[styles.iconStyle, {marginLeft: 30}]}
          />
          <Text style={[styles.titleText, {fontWeight: 'bold', color: '#fff'}]}>
            Política de Privacidade
          </Text>
        </View>
        <View style={{borderWidth: 1, borderColor: '#fff', width: '100%'}} />

        {/* Subtópico 1: Informações Pessoais */}
        <View style={styles.subtopicContainer}>
          <Text style={styles.subtopicTitle}>1. Informações Pessoais</Text>
          <Text style={styles.subtopicText}>
            Nosso aplicativo coleta dados como nome completo, email, senha
            (criptografada), número de telefone e tipo de usuário para permitir
            a criação de uma conta e a realização de login no sistema.
          </Text>
        </View>

        {/* Subtópico 2: Permissões de Acesso */}
        <View style={styles.subtopicContainer}>
          <Text style={styles.subtopicTitle}>2. Permissões de Acesso</Text>
          <Text style={styles.subtopicText}>
            Solicitamos acesso à câmera do dispositivo para que você possa tirar
            fotos necessárias à funcionalidade do aplicativo.
          </Text>
        </View>

        {/* Subtópico 3: Segurança */}
        <View style={styles.subtopicContainer}>
          <Text style={styles.subtopicTitle}>3. Segurança</Text>
          <Text style={styles.subtopicText}>
            Adotamos medidas de segurança apropriadas para autenticação dos
            usuários no sistema, e recomendamos que estes não compartilhem suas
            senhas com terceiros.
          </Text>
        </View>

        {/* Subtópico 4: Melhoria de Serviços */}
        <View style={styles.subtopicContainer}>
          <Text style={styles.subtopicTitle}>4. Melhoria de Serviços</Text>
          <Text style={styles.subtopicText}>
            Os dados coletados nos ajudam a melhorar e otimizar o desempenho e
            as funcionalidades do aplicativo.
          </Text>
        </View>

        {/* Subtópico 5: Compartilhamento de Dados */}
        <View style={styles.subtopicContainer}>
          <Text style={styles.subtopicTitle}>5. Compartilhamento de Dados</Text>
          <Text style={styles.subtopicText}>
            Podemos compartilhar dados anonimizados e agregados com serviços
            terceirizados para fins de análise e melhoria de serviços, mas não
            compartilhamos informações pessoais identificáveis sem o seu
            consentimento.
          </Text>
        </View>

        {/* Subtópico 6: Consentimento */}
        <View style={styles.subtopicContainer}>
          <Text style={styles.subtopicTitle}>6. Consentimento</Text>
          <Text style={styles.subtopicText}>
            Ao utilizar nosso aplicativo, você concorda com a coleta e uso das
            informações conforme descrito nesta Política de Privacidade.
          </Text>
        </View>

        <View>
          <Text>{'            '}</Text>
          <Text>{'            '}</Text>
          <Text>{'            '}</Text>
          <Text>{'            '}</Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  titleArea: {
    flexDirection: 'row',
    margin: 30,
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
  },
  titleText: {
    fontSize: 22,
    color: 'white',
  },
  iconStyle: {
    marginHorizontal: 10,
    alignContent: 'center',
    alignSelf: 'center',
  },
  subtopicContainer: {
    marginTop: 20,
    paddingHorizontal: 50,
  },
  subtopicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtopicText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default PrivacyPolicyScreen;
