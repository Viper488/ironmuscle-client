import 'react-native-gesture-handler';
import React, {useCallback, useState} from 'react';
import {Alert, Button, Image, Modal, Text, View} from 'react-native';
import styles from '../../styles/Styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import exerciseStyles from '../../styles/ExerciseStyles';
import CountDown from 'react-native-countdown-component';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {black, blue, white, yellow} from '../../styles/Colors';
import YoutubePlayer from 'react-native-youtube-iframe';

const ShowExercise = ({navigation}, index, training, exercises, length) => {
  const [key, setKey] = useState(0);
  const [run, setRun] = useState(false);
  const [prevRun, setPrevRun] = useState(false);
  const [start, setStart] = useState('START');
  const [modalVisible, setModalVisible] = useState(false);
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const handleYoutubePress = () => {
    if (run) {
      setPrevRun(run);
      setRun(false);
    }
    if (start === 'STOP') {
      setStart('START');
    }
    setModalVisible(!modalVisible);
  };

  const handleExitModal = () => {
    if (prevRun) {
      setRun(prevRun);
      setStart('STOP');
      setPrevRun(false);
    }
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => handleExitModal()}>
        <View style={exerciseStyles.modalContent}>
          <YoutubePlayer
            height={300}
            play={playing}
            videoId={exercises[index].video}
            onChangeState={onStateChange}
          />
        </View>
      </Modal>
      <View style={exerciseStyles.content}>
        <View style={exerciseStyles.youtubeBtn}>
          <TouchableOpacity
            onPress={() => {
              handleYoutubePress();
            }}>
            <FontAwesome5 name={'youtube'} size={50} color={'red'} />
          </TouchableOpacity>
        </View>
        <View style={exerciseStyles.imageContent}>
          <Image
            style={exerciseStyles.image}
            source={{uri: exercises[index].image}}
            resizeMode={'contain'}
          />
        </View>
      </View>
      <View style={exerciseStyles.exerciseTitleContent}>
        <Text style={exerciseStyles.exerciseTitle}>
          {exercises[index].name}
        </Text>
      </View>
      <View style={exerciseStyles.timerContent}>
        {exercises[index].time === 0 ? (
          <Text style={exerciseStyles.repetitions}>
            {'x' + exercises[index].repetitions}
          </Text>
        ) : (
          <CountDown
            id={key.toString()}
            until={exercises[index].time}
            size={30}
            onFinish={() => {
              setKey(prevKey => prevKey + 1);
              setRun(false);
              setStart('START');
              navigation.navigate('Exercise', {
                index: index + 1,
                training: training,
                exercises: exercises,
                length: length,
              });
            }}
            digitStyle={{backgroundColor: black}}
            digitTxtStyle={{color: white}}
            timeToShow={['M', 'S']}
            timeLabels={{m: null, s: null}}
            running={run}
          />
        )}
      </View>
      <View style={exerciseStyles.controlBtnContent}>
        <View style={exerciseStyles.skipBtn}>
          <TouchableOpacity>
            <View style={exerciseStyles.btnContent}>
              <FontAwesome5 color={'#000'} name={'backward'} size={15} />
              <Text
                style={exerciseStyles.skipBtnText}
                onPress={() => {
                  if (index > 0) {
                    if (run) {
                      setRun(false);
                      setStart('STOP');
                    }
                    navigation.navigate('Exercise', {
                      index: index - 1,
                      training: training,
                      exercises: exercises,
                      length: length,
                    });
                  }
                }}>
                Back
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={exerciseStyles.btn}>
          <TouchableOpacity>
            <View style={exerciseStyles.btnContent}>
              {exercises[index].time === 0 ? (
                <FontAwesome5 name={'check'} size={30} color={'#FFF'} />
              ) : undefined}
              <Text
                style={exerciseStyles.btnText}
                onPress={() => {
                  if (exercises[index].time === 0) {
                    navigation.navigate('Exercise', {
                      index: index + 1,
                      training: training,
                      exercises: exercises,
                      length: length,
                    });
                  } else {
                    run ? setRun(false) : setRun(true);
                    start === 'START' ? setStart('STOP') : setStart('START');
                  }
                }}>
                {exercises[index].time === 0 ? 'DONE' : start}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={exerciseStyles.skipBtn}>
          <TouchableOpacity>
            <View style={exerciseStyles.btnContent}>
              <Text
                style={exerciseStyles.skipBtnText}
                onPress={() => {
                  if (run) {
                    setRun(false);
                    setStart('START');
                    navigation.navigate('Exercise', {
                      index: index + 1,
                      training: training,
                      exercises: exercises,
                      length: length,
                    });
                  } else {
                    navigation.navigate('Exercise', {
                      index: index + 1,
                      training: training,
                      exercises: exercises,
                      length: length,
                    });
                  }
                }}>
                Skip
              </Text>
              <FontAwesome5 name={'forward'} size={15} color={'#000'} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ShowExercise;
