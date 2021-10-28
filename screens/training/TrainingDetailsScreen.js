import 'react-native-gesture-handler';
import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  BackHandler,
  Modal,
} from 'react-native';
import styles from '../../styles/Styles';
import trainingsStyles from '../../styles/TrainingsStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useFocusEffect} from '@react-navigation/native';
import tdStyles from '../../styles/TrainingDetailsStyles';
import Bolts from '../components/Bolts';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {grey, white} from '../../styles/Colors';
import exerciseStyles from '../../styles/ExerciseStyles';
import YoutubePlayer from 'react-native-youtube-iframe';
import {toHHMMSS} from '../functions/Functions';

const TrainingDetailsScreen = ({navigation, route}) => {
  const [training, setTraining] = useState({});
  const [exercises, setExercises] = useState([]);
  const [originalExercises, setOriginalExercises] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [modalName, setModalName] = useState('');
  const [modalVideo, setModalVideo] = useState('');

  useEffect(() => {
    setTraining(route.params.training);
    setExercises(route.params.exercises);
    setOriginalExercises(route.params.exercises);
  }, [route.params.exercises, route.params.training]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        console.log(exercises);
        console.log(originalExercises);
        setExercises(originalExercises);
        navigation.navigate('TrainingsList', {
          type: route.params.type,
        });
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [exercises, navigation, originalExercises, route.params.type]),
  );

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={exerciseStyles.modalContent}>
          <TouchableOpacity
            style={exerciseStyles.exitModalBtn}
            onPress={() => setModalVisible(false)}>
            <View>
              <FontAwesome5 name={'arrow-left'} size={50} color={white} />
            </View>
          </TouchableOpacity>
          <Text style={exerciseStyles.btnText}>{modalName}</Text>
          <YoutubePlayer
            height={300}
            play={playing}
            videoId={modalVideo}
            onChangeState={onStateChange}
          />
        </View>
      </Modal>
      <Image source={{uri: training.image}} style={tdStyles.imageBanner} />
      <View style={tdStyles.cardContent}>
        <Text style={trainingsStyles.name}>
          {training.name} {training.difficulty} {'\n'}
          {exercises.length + ' exercises'}
        </Text>
        <View style={trainingsStyles.bolts}>
          <Bolts difficulty={training.difficulty} size={25} />
        </View>
      </View>
      <TouchableOpacity
        style={tdStyles.btn}
        onPress={() => {
          navigation.navigate('Exercise', {
            index: 0,
            training: training,
            exercises: exercises,
            length: exercises.length,
            startTime: new Date().getTime(),
          });
        }}>
        <Text style={tdStyles.btnText}>START</Text>
      </TouchableOpacity>
      <View style={tdStyles.contentList}>
        <DraggableFlatList
          style={trainingsStyles.notificationList}
          data={exercises}
          keyExtractor={(item, index) => `draggable-item-${item.key}`}
          renderItem={({item, index, drag, isActive}) => {
            return (
              <View
                style={[
                  tdStyles.card,
                  {backgroundColor: isActive ? grey : white},
                ]}>
                <TouchableOpacity style={tdStyles.dragBtn} onLongPress={drag}>
                  <FontAwesome5 name={'bars'} size={50} color={grey} />
                </TouchableOpacity>
                <Text style={tdStyles.exerciseName}>{item.name}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                    setModalName(item.name);
                    setModalVideo(item.video);
                  }}>
                  <FontAwesome5
                    name={'question-circle'}
                    size={30}
                    color={'grey'}
                  />
                </TouchableOpacity>
                <View style={tdStyles.exerciseDuration}>
                  <Text style={tdStyles.exerciseDurationText}>
                    {item.time === 0
                      ? 'x' + item.repetitions
                      : toHHMMSS(item.time)}
                  </Text>
                </View>
              </View>
            );
          }}
          onDragEnd={({data}) => setExercises(data)}
        />
      </View>
    </View>
  );
};

export default TrainingDetailsScreen;
