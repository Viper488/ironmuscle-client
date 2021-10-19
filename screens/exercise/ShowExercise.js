import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import styles from '../../styles/Styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import exerciseStyles from '../../styles/ExerciseStyles';
import CountDown from 'react-native-countdown-component';

const ShowExercise = ({navigation}, index, training, exercises, length) => {
  const [key, setKey] = useState(0);
  const [run, setRun] = useState(false);
  const [start, setStart] = useState('START');

  return (
    <View style={styles.container}>
      <Text style={styles.textInput}>{exercises[index].name}</Text>
      <View style={exerciseStyles.timerContent}>
        {exercises[index].time === 0 ? (
          <View>
            <Text>{exercises[index].repetitions}</Text>
          </View>
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
            digitStyle={{backgroundColor: '#FFF'}}
            digitTxtStyle={{color: '#000'}}
            timeToShow={['M', 'S']}
            timeLabels={{m: 'MM', s: 'SS'}}
            running={run}
          />
        )}
      </View>
      <View style={exerciseStyles.content}>
        <Text style={exerciseStyles.title}>{exercises[index].name}</Text>
      </View>
      <View style={exerciseStyles.controlBtnContent}>
        <TouchableOpacity style={exerciseStyles.btn}>
          <Text
            style={styles.btnText}
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
        </TouchableOpacity>
        <TouchableOpacity style={exerciseStyles.btn}>
          <Text
            style={styles.btnText}
            onPress={() => {
              if (exercises[index].time === 0) {
                navigation.navigate('Exercise', {
                  index: index + 1,
                  training: training,
                  exercises: exercises,
                  length: length,
                });
              } else {
                run === true ? setRun(false) : setRun(true);
                start === 'START' ? setStart('STOP') : setStart('START');
              }
            }}>
            {exercises[index].time === 0 ? 'NEXT EXERCISE' : start}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={exerciseStyles.btn}>
          <Text
            style={styles.btnText}
            onPress={() => {
              if (run) {
                setRun(false);
                setStart('START');
              }
              navigation.navigate('Exercise', {
                index: index + 1,
                training: training,
                exercises: exercises,
                length: length,
              });
            }}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShowExercise;
