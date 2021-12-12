import 'react-native-gesture-handler';
import React, {useCallback, useState} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert,
  BackHandler,
} from 'react-native';
import styles from '../../../styles/Styles';
import exerciseStyles from '../../../styles/ExerciseStyles';
import CountDown from 'react-native-countdown-component';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {black, white} from '../../../styles/Colors';
import YoutubePlayer from 'react-native-youtube-iframe';
import {RFValue} from 'react-native-responsive-fontsize';

const ShowExercise = ({
  navigation,
  index,
  training,
  exercises,
  length,
  startTime,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [key, setKey] = useState(0);
  const [run, setRun] = useState(false);
  const [start, setStart] = useState('START');
  const [prevRun, setPrevRun] = useState(false);
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const handlePressMore = () => {
    if (run) {
      setRun(false);
      setStart('START');
      setPrevRun(true);
    }
    setModalVisible(true);
  };

  const handleExitModal = () => {
    if (prevRun) {
      setRun(true);
      setStart('STOP');
      setPrevRun(false);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => handleExitModal()}>
        <View style={exerciseStyles.modalContent}>
          <TouchableOpacity
            style={exerciseStyles.exitModalBtn}
            onPress={() => handleExitModal()}>
            <View>
              <FontAwesome5
                name={'arrow-left'}
                size={RFValue(50)}
                color={white}
              />
            </View>
          </TouchableOpacity>
          <Text style={exerciseStyles.modalTitle}>{exercises[index].name}</Text>
          <YoutubePlayer
            height={RFValue(300)}
            play={playing}
            videoId={exercises[index].video}
            onChangeState={onStateChange}
          />
        </View>
      </Modal>
      <View style={exerciseStyles.content}>
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
        <View style={exerciseStyles.youtubeBtn}>
          <TouchableOpacity
            onPress={() => {
              handlePressMore();
            }}>
            <FontAwesome5
              name={'question-circle'}
              size={RFValue(40)}
              color={'grey'}
            />
          </TouchableOpacity>
        </View>
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
            size={RFValue(30)}
            onFinish={() => {
              setKey(prevKey => prevKey + 1);
              setRun(false);
              setStart('START');
              navigation.navigate('Exercise', {
                index: index + 1,
                training: training,
                exercises: exercises,
                length: length,
                startTime: startTime,
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
              <FontAwesome5
                color={'#000'}
                name={'backward'}
                size={RFValue(15)}
              />
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
                      startTime: startTime,
                    });
                  }
                }}>
                Back
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={exerciseStyles.btn}>
          {exercises[index].time === 0 ? (
            <TouchableOpacity>
              <View style={exerciseStyles.btnContent}>
                <FontAwesome5
                  name={'check'}
                  size={RFValue(30)}
                  color={'#FFF'}
                />
                <Text
                  style={exerciseStyles.btnText}
                  onPress={() => {
                    navigation.navigate('Exercise', {
                      index: index + 1,
                      training: training,
                      exercises: exercises,
                      length: length,
                      startTime: startTime,
                    });
                  }}>
                  DONE
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <View style={exerciseStyles.btnContent}>
                <Text
                  style={exerciseStyles.btnText}
                  onPress={() => {
                    run ? setRun(false) : setRun(true);
                    start === 'START' ? setStart('STOP') : setStart('START');
                  }}>
                  {start}
                </Text>
              </View>
            </TouchableOpacity>
          )}
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
                      startTime: startTime,
                    });
                  } else {
                    navigation.navigate('Exercise', {
                      index: index + 1,
                      training: training,
                      exercises: exercises,
                      length: length,
                      startTime: startTime,
                    });
                  }
                }}>
                Skip
              </Text>
              <FontAwesome5
                name={'forward'}
                size={RFValue(15)}
                color={'#000'}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ShowExercise;
