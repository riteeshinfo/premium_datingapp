
import { StyleSheet, View,useWindowDimensions } from 'react-native';
import React, {  useState,useEffect }  from 'react';
import Card from './compoents/Card'
import data from './compoents/users'
import  Animated,  { useAnimatedStyle, 
  useSharedValue,
  runOnJS,
  useAnimatedGestureHandler,
  useDerivedValue,
  interpolate,
  
 } from 'react-native-reanimated';
 import { PanGestureHandler } from 'react-native-gesture-handler';
 const ROTATION=60;
 

export default function App() {
  const hiddenTranslateX = 2 * screenWidth;
  const translateX = useSharedValue(0);
  const {width: screenWidth} = useWindowDimensions();
  const [currentstate,setset]=useState(0);
  const [nextIndex,setnextIndex]=useState(currentstate + 1)
  const currentprofile=data[currentstate]
  const nextprofile=data[nextIndex]
  
  const rotate = useDerivedValue(
    () =>
      interpolate(translateX.value, [0, hiddenTranslateX], [0, ROTATION]) +
      'deg',
  );

const cardStyle=useAnimatedStyle(()=>({
  transform:[{
    translateX: translateX.value,
  },
  {
    rotate: rotate.value,
  }
],
     
}));
const nextCardStyle = useAnimatedStyle(() => ({
  transform: [
    {
      scale: interpolate(
        translateX.value,
       
      ),
    },
  ],
  opacity: interpolate(
    translateX.value,
    [-hiddenTranslateX, 0, hiddenTranslateX],
    [1, 0.5, 1],
  ),


  
}));
const gestureHandler = useAnimatedGestureHandler({
  onStart:(_, context) =>{
    context.startx = translateX.value
  },
  onActive: (event,context) => {
    translateX.value=context.startx + event.translateX

  },
  onEnd: event=>{
    if (Math.abs(event.velocityX) < SWIPE_VELOCITY) {
      translateX.value = withSpring(0);
      return;
    }

    translateX.value = withSpring(
      hiddenTranslateX * Math.sign(event.velocityX),
      {},
      () => runOnJS(setset)(currentIndex + 1),
    );
    

    
  
     
    
  },
});
useEffect(() => {
  translateX.value = 0;
  setnextIndex(currentstate + 1);
}, [currentstate, translateX]);

  return (

    <View style={styles.container}>
      <View style={styles.nextcard}>
        <Animated.View style={[styles.animatedcard,nextCardStyle]}>
        <Card user={nextprofile} />
        </Animated.View>
      </View>
     <PanGestureHandler gestureHandler={gestureHandler}>
     <Animated.View style={[styles.animatedcard, cardStyle ]}>
      
          
        <Card user={currentprofile} />
      
      
     </Animated.View>
     </PanGestureHandler> 
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    alignItems: 'center',
    justifyContent: 'center',
     
  },
  animatedcard:{
    width: '100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
    flex:1,
    
    

  },
  nextcard:{
    ...StyleSheet.absoluteFill,
    
    justifyContent:'center',
    alignContent:'center',
    
      

  }
}); 