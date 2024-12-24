// Getting our breakpoint for javascript
window.Breakpoint = {};

Breakpoint.refreshValue = function () {
	this.value = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
};

$(window).resize(function () {
	Breakpoint.refreshValue();
}).resize();


// Libs
import PubSub from "underpub-js";
import Sitewide from "./classes/Sitewide";
import ComponentsLoader from "./classes/ComponentsLoader";
import Analytics from "./classes/Analytics";

// Components Import -- DO NOT REMOVE COMMENT!
import AssignmentExample from "../../templates/_components/molecules/FloorPlans/AssignmentExample/AssignmentExample";
import ListingComponent from "../../templates/_components/molecules/FloorPlans/ListingComponent/ListingComponent";
import Krisha from "../../templates/_components/molecules/FloorPlans/Krisha/Krisha";
import MapWithPoiList from "../../templates/_components/molecules/Maps/MapWithPoiList/MapWithPoiList";
import CardUnit from "../../templates/_components/elements/Cards/CardUnit/CardUnit";
import MediaPrimary from "../../templates/_components/molecules/Media/MediaPrimary/MediaPrimary";
import SplashPageStyleFour from "../../templates/_components/molecules/SplashPages/SplashPageStyleFour/SplashPageStyleFour";
import SplashPageStyleThree from "../../templates/_components/molecules/SplashPages/SplashPageStyleThree/SplashPageStyleThree";
import SplashPageStyleTwo from "../../templates/_components/molecules/SplashPages/SplashPageStyleTwo/SplashPageStyleTwo";
import LayoutSplashPage from "../../templates/_components/layouts/LayoutSplashPage/LayoutSplashPage";
import SplashPageStyleOne from "../../templates/_components/molecules/SplashPages/SplashPageStyleOne/SplashPageStyleOne";
import ListingUnits from "../../templates/_components/molecules/Listings/ListingUnits/ListingUnits";
import ResponsiveImage from "../../templates/_components/atoms/Media/ResponsiveImage/ResponsiveImage";
import CardBgImage from "../../templates/_components/elements/Cards/CardBgImage/CardBgImage";
import ListingBgImageCardsSlider from "../../templates/_components/molecules/Listings/ListingBgImageCardsSlider/ListingBgImageCardsSlider";
import Intro from "../../templates/_components/elements/Global/Intro/Intro";
import ModalInfo from "../../templates/_components/molecules/Modals/ModalInfo/ModalInfo";
import IframeEmbed from "../../templates/_components/elements/Media/IframeEmbed/IframeEmbed";
import IframeCentered from "../../templates/_components/molecules/Media/IframeCentered/IframeCentered";
import Banner from "../../templates/_components/molecules/Global/Banner/Banner";
import WidgetPopup from "../../templates/_components/molecules/Widgets/WidgetPopup/WidgetPopup";
import ListingUnitsFilters from "../../templates/_components/elements/Listings/ListingUnitsFilters/ListingUnitsFilters";
import HotspotModal from "../../templates/_components/elements/Media/HotspotModal/HotspotModal";
import Hotspots from "../../templates/_components/molecules/Media/Hotspots/Hotspots";
import ContentTextMediaTypeTwo from "../../templates/_components/molecules/Content/ContentTextMediaTypeTwo/ContentTextMediaTypeTwo";
import ButtonIcon from "../../templates/_components/atoms/Buttons/ButtonIcon/ButtonIcon";
import Styleguide from "../../templates/_components/molecules/Misc/Styleguide/Styleguide";
import UnitTypeInformation from "../../templates/_components/molecules/UnitType/UnitTypeInformation/UnitTypeInformation";
import BreakpointIndicator from "../../templates/_components/atoms/Global/BreakpointIndicator/BreakpointIndicator";
import PopupUnit from "../../templates/_components/elements/Popup/PopupUnit/PopupUnit";
import FloorPlansViewer from "../../templates/_components/molecules/FloorPlans/FloorPlansViewer/FloorPlansViewer";
import ListingUnitTypes from "../../templates/_components/molecules/Listings/ListingUnitTypes/ListingUnitTypes";
import ModalUnit from "../../templates/_components/molecules/Modals/ModalUnit/ModalUnit";
import ListingUnitTable from "../../templates/_components/molecules/Listings/ListingUnitTable/ListingUnitTable";
import ModalForm from "../../templates/_components/molecules/Modals/ModalForm/ModalForm";
import ModalHeader from "../../templates/_components/molecules/Modals/ModalHeader/ModalHeader";
import FooterNavigation from "../../templates/_components/elements/Global/FooterNavigation/FooterNavigation";
import Footer from "../../templates/_components/molecules/Global/Footer/Footer";
import HeaderNavigation from "../../templates/_components/elements/Global/HeaderNavigation/HeaderNavigation";
import Header from "../../templates/_components/molecules/Global/Header/Header";
import MapStandard from "../../templates/_components/molecules/Maps/MapStandard/MapStandard";
import HeroComplex from "../../templates/_components/molecules/Heros/HeroComplex/HeroComplex";
import MediaTakeover from "../../templates/_components/elements/Media/MediaTakeover/MediaTakeover";
import HeroStandard from "../../templates/_components/molecules/Heros/HeroStandard/HeroStandard";
import HeroBasic from "../../templates/_components/molecules/Heros/HeroBasic/HeroBasic";
import CallToActionFormInset from "../../templates/_components/molecules/CallToActions/CallToActionFormInset/CallToActionFormInset";
import Form from "../../templates/_components/elements/Forms/Form/Form";
import CallToActionForm from "../../templates/_components/molecules/CallToActions/CallToActionForm/CallToActionForm";
import CallToActionStandard from "../../templates/_components/molecules/CallToActions/CallToActionStandard/CallToActionStandard";
import ContentTextMediaTypeOne from "../../templates/_components/molecules/Content/ContentTextMediaTypeOne/ContentTextMediaTypeOne";
import ContentTextTypeFour from "../../templates/_components/molecules/Content/ContentTextTypeFour/ContentTextTypeFour";
import ContentTextTypeThree from "../../templates/_components/molecules/Content/ContentTextTypeThree/ContentTextTypeThree";
import ContentTextTypeTwo from "../../templates/_components/molecules/Content/ContentTextTypeTwo/ContentTextTypeTwo";
import ContentTextTypeOne from "../../templates/_components/molecules/Content/ContentTextTypeOne/ContentTextTypeOne";
import QuoteStandard from "../../templates/_components/molecules/Quotes/QuoteStandard/QuoteStandard";
import CardFaq from "../../templates/_components/elements/Cards/CardFaq/CardFaq";
import ListingFaq from "../../templates/_components/molecules/Listings/ListingFaq/ListingFaq";
import CardInfo from "../../templates/_components/elements/Cards/CardInfo/CardInfo";
import ListingInfo from "../../templates/_components/molecules/Listings/ListingInfo/ListingInfo";
import MediaTrio from "../../templates/_components/molecules/Media/MediaTrio/MediaTrio";
import MediaDuo from "../../templates/_components/molecules/Media/MediaDuo/MediaDuo";
import CarouselFullWidth from "../../templates/_components/molecules/Media/CarouselFullWidth/CarouselFullWidth";
import CarouselCentered from "../../templates/_components/molecules/Media/CarouselCentered/CarouselCentered";
import VideoFullWidth from "../../templates/_components/molecules/Media/VideoFullWidth/VideoFullWidth";
import VideoCentered from "../../templates/_components/molecules/Media/VideoCentered/VideoCentered";
import VideoPlayer from "../../templates/_components/elements/Media/VideoPlayer/VideoPlayer";
import Carousel from "../../templates/_components/elements/Media/Carousel/Carousel";
import Pagination from "../../templates/_components/elements/Global/Pagination/Pagination";
import Breadcrumbs from "../../templates/_components/elements/Global/Breadcrumbs/Breadcrumbs";
import VideoLoop from "../../templates/_components/atoms/Media/VideoLoop/VideoLoop";
import Hamburger from "../../templates/_components/atoms/Global/Hamburger/Hamburger";
import ButtonSecondary from "../../templates/_components/atoms/Buttons/ButtonSecondary/ButtonSecondary";
import CardIconInfo from "../../templates/_components/elements/Cards/CardIconInfo/CardIconInfo";
import ButtonPrimary from "../../templates/_components/atoms/Buttons/ButtonPrimary/ButtonPrimary";
import ListingIconInfo from "../../templates/_components/molecules/Listings/ListingIconInfo/ListingIconInfo";
import Loader from "../../templates/_components/molecules/Global/Loader/Loader";

$(document).ready(function () {

	var components = [
		// Components Loader -- DO NOT REMOVE COMMENT!
{handle: ".mol-AssignmentExample", require: AssignmentExample },
{handle: ".mol-ListingComponent", require: ListingComponent },
{handle: ".mol-Krisha", require: Krisha },
{handle: ".mol-MapWithPoiList", require: MapWithPoiList },
{handle: ".el-CardUnit", require: CardUnit },
{handle: ".mol-MediaPrimary", require: MediaPrimary },
{handle: ".mol-SplashPageStyleFour", require: SplashPageStyleFour },
{handle: ".mol-SplashPageStyleThree", require: SplashPageStyleThree },
{handle: ".mol-SplashPageStyleTwo", require: SplashPageStyleTwo },
{handle: ".layout-LayoutSplashPage", require: LayoutSplashPage },
{handle: ".mol-SplashPageStyleOne", require: SplashPageStyleOne },
{handle: ".mol-ListingUnits", require: ListingUnits },
{handle: ".atom-ResponsiveImage", require: ResponsiveImage },
{handle: ".el-CardBgImage", require: CardBgImage },
{handle: ".mol-ListingBgImageCardsSlider", require: ListingBgImageCardsSlider },
{handle: ".el-Intro", require: Intro },
{handle: ".mol-ModalInfo", require: ModalInfo },
{handle: ".el-IframeEmbed", require: IframeEmbed },
{handle: ".mol-IframeCentered", require: IframeCentered },
{handle: ".mol-Banner", require: Banner },
{handle: ".mol-WidgetPopup", require: WidgetPopup },
{handle: ".el-ListingUnitsFilters", require: ListingUnitsFilters },
{handle: ".el-HotspotModal", require: HotspotModal },
{handle: ".mol-Hotspots", require: Hotspots },
{handle: ".mol-ContentTextMediaTypeTwo", require: ContentTextMediaTypeTwo },
{handle: ".atom-ButtonIcon", require: ButtonIcon },
{handle: ".mol-Styleguide", require: Styleguide },
{handle: ".mol-UnitTypeInformation", require: UnitTypeInformation },
{handle: ".atom-BreakpointIndicator", require: BreakpointIndicator },
{handle: ".el-PopupUnit", require: PopupUnit },
{handle: ".mol-FloorPlansViewer", require: FloorPlansViewer },
{handle: ".mol-ListingUnitTypes", require: ListingUnitTypes },
{handle: ".mol-ModalUnit", require: ModalUnit },
{handle: ".mol-ListingUnitTable", require: ListingUnitTable },
{handle: ".mol-ModalForm", require: ModalForm },
{handle: ".mol-ModalHeader", require: ModalHeader },
{handle: ".el-FooterNavigation", require: FooterNavigation },
{handle: ".mol-Footer", require: Footer },
{handle: ".el-HeaderNavigation", require: HeaderNavigation },
{handle: ".mol-Header", require: Header },
{handle: ".mol-MapStandard", require: MapStandard },
{handle: ".mol-HeroComplex", require: HeroComplex },
{handle: ".el-MediaTakeover", require: MediaTakeover },
{handle: ".mol-HeroStandard", require: HeroStandard },
{handle: ".mol-HeroBasic", require: HeroBasic },
{handle: ".mol-CallToActionFormInset", require: CallToActionFormInset },
{handle: ".el-Form", require: Form },
{handle: ".mol-CallToActionForm", require: CallToActionForm },
{handle: ".mol-CallToActionStandard", require: CallToActionStandard },
{handle: ".mol-ContentTextMediaTypeOne", require: ContentTextMediaTypeOne },
{handle: ".mol-ContentTextTypeFour", require: ContentTextTypeFour },
{handle: ".mol-ContentTextTypeThree", require: ContentTextTypeThree },
{handle: ".mol-ContentTextTypeTwo", require: ContentTextTypeTwo },
{handle: ".mol-ContentTextTypeOne", require: ContentTextTypeOne },
{handle: ".mol-QuoteStandard", require: QuoteStandard },
{handle: ".el-CardFaq", require: CardFaq },
{handle: ".mol-ListingFaq", require: ListingFaq },
{handle: ".el-CardInfo", require: CardInfo },
{handle: ".mol-ListingInfo", require: ListingInfo },
{handle: ".mol-MediaTrio", require: MediaTrio },
{handle: ".mol-MediaDuo", require: MediaDuo },
{handle: ".mol-CarouselFullWidth", require: CarouselFullWidth },
{handle: ".mol-CarouselCentered", require: CarouselCentered },
{handle: ".mol-VideoFullWidth", require: VideoFullWidth },
{handle: ".mol-VideoCentered", require: VideoCentered },
{handle: ".el-VideoPlayer", require: VideoPlayer },
{handle: ".el-Carousel", require: Carousel },
{handle: ".el-Pagination", require: Pagination },
{handle: ".el-Breadcrumbs", require: Breadcrumbs },
{handle: ".atom-VideoLoop", require: VideoLoop },
{handle: ".atom-Hamburger", require: Hamburger },
{handle: ".atom-ButtonSecondary", require: ButtonSecondary },
{handle: ".el-CardIconInfo", require: CardIconInfo },
{handle: ".atom-ButtonPrimary", require: ButtonPrimary },
{handle: ".mol-ListingIconInfo", require: ListingIconInfo },
{handle: ".mol-Loader", require: Loader },
	];

	var sitewide = new Sitewide();
	sitewide.init();

	// Getting our components loading going
	window.componentsLoader = new ComponentsLoader({
		components: components
	});
	window.componentsLoader.initScreen();

	// kick off Analytics
	var analytics = new Analytics();
	analytics.init();  

	// setting our breakpoint value
	Breakpoint.refreshValue();

});