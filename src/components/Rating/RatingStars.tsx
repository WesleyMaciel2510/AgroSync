import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faStar as faStarSolid} from '@fortawesome/free-solid-svg-icons';
import {faStar as faStarRegular} from '@fortawesome/free-regular-svg-icons';

const RatingStars = () => {
  const [selectedStars, setSelectedStars] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleSelect = (index: number) => {
    const updatedStars = selectedStars.map((_, i) => {
      if (i <= index) {
        // Set all stars to the left of the pressed star, and the star itself, to true
        return true;
      }
      // Set all stars to the right of the pressed star to false
      return false;
    });
    setSelectedStars(updatedStars);
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
      }}>
      {selectedStars.map((selected, index) => (
        <TouchableOpacity key={index} onPress={() => handleSelect(index)}>
          <FontAwesomeIcon
            icon={selected ? faStarSolid : faStarRegular}
            size={50}
            color="#f0ed3a"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RatingStars;
