import {colors, fonts} from '@constants';
import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: colors.black,
  },
  btnBack: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: fonts.MONTSERRAT_BOLD,
    fontSize: 18,
    color: colors.white,
  },
  headerSpacer: {
    width: 40,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: colors.lighterGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  mapText: {
    fontFamily: fonts.MONTSERRAT_BOLD,
    fontSize: 18,
    color: colors.black,
    marginTop: 15,
  },
  mapSubtext: {
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    fontSize: 14,
    color: colors.gray,
    marginTop: 5,
    textAlign: 'center',
  },
  bottom: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    bottom: 0,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  btnLocate: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 20,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  btnLocateActive: {
    backgroundColor: colors.gray,
  },
  textLocate: {
    color: colors.white,
    fontFamily: fonts.MONTSERRAT_SEMIBOLD,
    fontSize: 14,
    marginLeft: 8,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    color: colors.black,
    fontFamily: fonts.MONTSERRAT_BOLD,
    fontSize: 18,
    marginLeft: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: fonts.MONTSERRAT_BOLD,
    fontSize: 16,
    color: colors.black,
    marginBottom: 12,
  },
  citiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  cityButton: {
    backgroundColor: colors.lighterGray,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.lighterGray,
  },
  cityButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  cityButtonText: {
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    fontSize: 14,
    color: colors.black,
  },
  cityButtonTextActive: {
    color: colors.white,
  },
  areasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  areaButton: {
    backgroundColor: colors.lighterGray,
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.lighterGray,
  },
  areaButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  areaButtonText: {
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    fontSize: 12,
    color: colors.black,
  },
  areaButtonTextActive: {
    color: colors.white,
  },
  manualInputSection: {
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    fontSize: 14,
    color: colors.black,
    marginBottom: 8,
  },
  manualInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.lighterGray,
    paddingHorizontal: 15,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    fontSize: 16,
    color: colors.black,
  },
  btnConfirm: {
    height: 50,
    borderRadius: 12,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  inputLabel: {
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    fontSize: 14,
    color: colors.black,
    marginBottom: 8,
  },
  manualInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.lighterGray,
    paddingHorizontal: 15,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    fontSize: 16,
    color: colors.black,
  },
});
