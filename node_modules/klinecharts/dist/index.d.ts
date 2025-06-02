/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export type Nullable<T> = T | null;
/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export interface KLineData {
	timestamp: number;
	open: number;
	high: number;
	low: number;
	close: number;
	volume?: number;
	turnover?: number;
	[key: string]: any;
}
export interface Margin {
	marginLeft: number;
	marginTop: number;
	marginRight: number;
	marginBottom: number;
}
export interface Padding {
	paddingLeft: number;
	paddingTop: number;
	paddingRight: number;
	paddingBottom: number;
}
export interface Offset {
	offsetLeft: number;
	offsetTop: number;
	offsetRight: number;
	offsetBottom: number;
}
/**
 * line type
 */
export declare enum LineType {
	Dashed = "dashed",
	Solid = "solid"
}
export interface LineStyle {
	style: LineType;
	size: number;
	color: string;
	dashedValue: number[];
}
export interface SmoothLineStyle extends LineStyle {
	smooth: boolean | number;
}
export interface StateLineStyle extends LineStyle {
	show: boolean;
}
export declare enum PolygonType {
	Stroke = "stroke",
	Fill = "fill",
	StrokeFill = "stroke_fill"
}
export interface PolygonStyle {
	style: PolygonType;
	color: string | CanvasGradient;
	borderColor: string;
	borderSize: number;
	borderStyle: LineType;
	borderDashedValue: number[];
}
export interface RectStyle extends PolygonStyle {
	borderRadius: number;
}
export interface TextStyle extends Padding {
	style: PolygonType;
	color: string;
	size: number;
	family: string;
	weight: number | string;
	borderStyle: LineType;
	borderDashedValue: number[];
	borderSize: number;
	borderColor: string;
	borderRadius: number;
	backgroundColor: string | CanvasGradient;
}
export interface StateTextStyle extends TextStyle {
	show: boolean;
}
export type LastValueMarkTextStyle = Omit<StateTextStyle, "backgroundColor">;
export declare enum TooltipShowRule {
	Always = "always",
	FollowCross = "follow_cross",
	None = "none"
}
export declare enum TooltipShowType {
	Standard = "standard",
	Rect = "rect"
}
export interface ChangeColor {
	upColor: string;
	downColor: string;
	noChangeColor: string;
}
export interface GradientColor {
	offset: number;
	color: string;
}
export interface GridStyle {
	show: boolean;
	horizontal: StateLineStyle;
	vertical: StateLineStyle;
}
export type TooltipTextStyle = Pick<TextStyle, "color" | "size" | "family" | "weight"> & Margin;
export interface TooltipLegendChild {
	text: string;
	color: string;
}
export interface TooltipLegend {
	title: string | TooltipLegendChild;
	value: string | TooltipLegendChild;
}
export declare enum TooltipIconPosition {
	Left = "left",
	Middle = "middle",
	Right = "right"
}
export interface TooltipIconStyle extends Padding, Margin {
	id: string;
	position: TooltipIconPosition;
	color: string;
	activeColor: string;
	size: number;
	fontFamily: string;
	icon: string;
	backgroundColor: string;
	activeBackgroundColor: string;
}
export interface TooltipStyle {
	showRule: TooltipShowRule;
	showType: TooltipShowType;
	defaultValue: string;
	text: TooltipTextStyle;
	icons: TooltipIconStyle[];
}
export interface CandleAreaPointStyle {
	show: boolean;
	color: string;
	radius: number;
	rippleColor: string;
	rippleRadius: number;
	animation: boolean;
	animationDuration: number;
}
export interface CandleAreaStyle {
	lineSize: number;
	lineColor: string;
	value: string;
	smooth: boolean;
	backgroundColor: string | GradientColor[];
	point: CandleAreaPointStyle;
}
export interface CandleHighLowPriceMarkStyle {
	show: boolean;
	color: string;
	textOffset: number;
	textSize: number;
	textFamily: string;
	textWeight: string;
}
export type CandleLastPriceMarkLineStyle = Omit<StateLineStyle, "color">;
export interface CandleLastPriceMarkStyle extends ChangeColor {
	show: boolean;
	line: CandleLastPriceMarkLineStyle;
	text: LastValueMarkTextStyle;
}
export interface CandlePriceMarkStyle {
	show: boolean;
	high: CandleHighLowPriceMarkStyle;
	low: CandleHighLowPriceMarkStyle;
	last: CandleLastPriceMarkStyle;
}
export declare enum CandleTooltipRectPosition {
	Fixed = "fixed",
	Pointer = "pointer"
}
export interface CandleTooltipRectStyle extends Omit<RectStyle, "style" | "borderDashedValue" | "borderStyle">, Padding, Offset {
	position: CandleTooltipRectPosition;
}
export interface CandleTooltipCustomCallbackData {
	prev: Nullable<KLineData>;
	current: KLineData;
	next: Nullable<KLineData>;
}
export type CandleTooltipCustomCallback = (data: CandleTooltipCustomCallbackData, styles: CandleStyle) => TooltipLegend[];
export interface CandleTooltipStyle extends TooltipStyle, Offset {
	custom: CandleTooltipCustomCallback | TooltipLegend[];
	rect: CandleTooltipRectStyle;
}
export declare enum CandleType {
	CandleSolid = "candle_solid",
	CandleStroke = "candle_stroke",
	CandleUpStroke = "candle_up_stroke",
	CandleDownStroke = "candle_down_stroke",
	Ohlc = "ohlc",
	Area = "area"
}
export interface CandleBarColor extends ChangeColor {
	upBorderColor: string;
	downBorderColor: string;
	noChangeBorderColor: string;
	upWickColor: string;
	downWickColor: string;
	noChangeWickColor: string;
}
export interface CandleStyle {
	type: CandleType;
	bar: CandleBarColor;
	area: CandleAreaStyle;
	priceMark: CandlePriceMarkStyle;
	tooltip: CandleTooltipStyle;
}
export type IndicatorPolygonStyle = Omit<PolygonStyle, "color" | "borderColor"> & ChangeColor;
export interface IndicatorLastValueMarkStyle {
	show: boolean;
	text: LastValueMarkTextStyle;
}
export interface IndicatorTooltipStyle extends TooltipStyle, Offset {
	showName: boolean;
	showParams: boolean;
}
export interface IndicatorStyle {
	ohlc: ChangeColor;
	bars: IndicatorPolygonStyle[];
	lines: SmoothLineStyle[];
	circles: IndicatorPolygonStyle[];
	lastValueMark: IndicatorLastValueMarkStyle;
	tooltip: IndicatorTooltipStyle;
	[key: string]: any;
}
export type AxisLineStyle = Omit<StateLineStyle, "style" | "dashedValue">;
export interface AxisTickLineStyle extends AxisLineStyle {
	length: number;
}
export interface AxisTickTextStyle extends Pick<StateTextStyle, "show" | "color" | "weight" | "family" | "size"> {
	marginStart: number;
	marginEnd: number;
}
export interface AxisStyle {
	show: boolean;
	size: number | "auto";
	axisLine: AxisLineStyle;
	tickLine: AxisTickLineStyle;
	tickText: AxisTickTextStyle;
}
export type XAxisStyle = AxisStyle;
export declare enum YAxisPosition {
	Left = "left",
	Right = "right"
}
export declare enum YAxisType {
	Normal = "normal",
	Percentage = "percentage",
	Log = "log"
}
export interface YAxisStyle extends AxisStyle {
	type: YAxisType;
	position: YAxisPosition;
	inside: boolean;
	reverse: boolean;
}
export interface CrosshairDirectionStyle {
	show: boolean;
	line: StateLineStyle;
	text: StateTextStyle;
}
export interface CrosshairStyle {
	show: boolean;
	horizontal: CrosshairDirectionStyle;
	vertical: CrosshairDirectionStyle;
}
export interface OverlayPointStyle {
	color: string;
	borderColor: string;
	borderSize: number;
	radius: number;
	activeColor: string;
	activeBorderColor: string;
	activeBorderSize: number;
	activeRadius: number;
}
export interface OverlayStyle {
	point: OverlayPointStyle;
	line: SmoothLineStyle;
	rect: RectStyle;
	polygon: PolygonStyle;
	circle: PolygonStyle;
	arc: LineStyle;
	text: TextStyle;
	/**
	 * @deprecated
	 * Starting from v10, it will be deleted
	 */
	rectText: TextStyle;
	[key: string]: any;
}
export interface SeparatorStyle {
	size: number;
	color: string;
	fill: boolean;
	activeBackgroundColor: string;
}
export interface Styles {
	grid: GridStyle;
	candle: CandleStyle;
	indicator: IndicatorStyle;
	xAxis: XAxisStyle;
	yAxis: YAxisStyle;
	separator: SeparatorStyle;
	crosshair: CrosshairStyle;
	overlay: OverlayStyle;
}
declare function merge(target: any, source: any): void;
declare function clone<T>(target: T): T;
declare function isArray<T = any>(value: any): value is T[];
declare function isFunction<T = (...args: any) => any>(value: any): value is T;
declare function isObject(value: any): value is object;
declare function isNumber(value: any): value is number;
declare function isValid<T>(value: T | null | undefined): value is T;
declare function isBoolean(value: any): value is boolean;
declare function isString(value: any): value is string;
declare function formatValue(data: unknown, key: string, defaultValue?: unknown): unknown;
declare function formatDate(dateTimeFormat: Intl.DateTimeFormat, timestamp: number, format: string): string;
declare function formatPrecision(value: string | number, precision?: number): string;
declare function formatBigNumber(value: string | number): string;
declare function formatThousands(value: string | number, sign: string): string;
declare function formatFoldDecimal(value: string | number, threshold: number): string;
declare function calcTextWidth(text: string, size?: number, weight?: string | number, family?: string): number;
/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export type ActionCallback = (data?: any) => void;
export declare enum ActionType {
	OnDataReady = "onDataReady",
	OnZoom = "onZoom",
	OnScroll = "onScroll",
	OnVisibleRangeChange = "onVisibleRangeChange",
	OnTooltipIconClick = "onTooltipIconClick",
	OnCrosshairChange = "onCrosshairChange",
	OnCandleBarClick = "onCandleBarClick",
	OnPaneDrag = "onPaneDrag"
}
export declare enum LoadDataType {
	Init = "init",
	Forward = "forward",
	Backward = "backward"
}
export interface LoadDataParams {
	type: LoadDataType;
	data: Nullable<KLineData>;
	callback: (dataList: KLineData[], more?: boolean) => void;
}
export type LoadDataCallback = (params: LoadDataParams) => void;
/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export type ExcludePickPartial<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;
/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export interface Bounding {
	width: number;
	height: number;
	left: number;
	right: number;
	top: number;
	bottom: number;
}
/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export interface VisibleRange {
	readonly from: number;
	readonly to: number;
	readonly realFrom: number;
	readonly realTo: number;
}
/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export interface BarSpace {
	bar: number;
	halfBar: number;
	gapBar: number;
	halfGapBar: number;
}
/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export interface Coordinate {
	x: number;
	y: number;
}
export interface Crosshair extends Partial<Coordinate> {
	paneId?: string;
	realX?: number;
	kLineData?: KLineData;
	dataIndex?: number;
	realDataIndex?: number;
}
export interface MouseTouchEvent extends Coordinate {
	pageX: number;
	pageY: number;
	isTouch?: boolean;
	preventDefault?: () => void;
}
/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends Array<infer U> ? Array<DeepPartial<U>> : T[P] extends ReadonlyArray<infer X> ? ReadonlyArray<DeepPartial<X>> : T[P] extends object ? DeepPartial<T[P]> : T[P];
};
/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export interface Point {
	dataIndex: number;
	timestamp: number;
	value: number;
}
/**
 * Since v9.8.0 deprecated, since v10 removed
 * @deprecated
 */
export type LoadMoreCallback = (timestamp: Nullable<number>) => void;
/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export interface Precision {
	price: number;
	volume: number;
}
/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export interface PaneGap {
	top?: number;
	bottom?: number;
}
export interface PaneAxisOptions {
	name?: string;
	scrollZoomEnabled?: boolean;
}
export declare const enum PanePosition {
	Top = "top",
	Bottom = "bottom"
}
export interface PaneOptions {
	id?: string;
	height?: number;
	minHeight?: number;
	dragEnabled?: boolean;
	position?: PanePosition;
	gap?: PaneGap;
	axisOptions?: PaneAxisOptions;
}
export declare enum FormatDateType {
	Tooltip = 0,
	Crosshair = 1,
	XAxis = 2
}
export type FormatDate = (dateTimeFormat: Intl.DateTimeFormat, timestamp: number, format: string, type: FormatDateType) => string;
export type FormatBigNumber = (value: string | number) => string;
export interface CustomApi {
	formatDate: FormatDate;
	formatBigNumber: FormatBigNumber;
}
export interface Locales {
	time: string;
	open: string;
	high: string;
	low: string;
	close: string;
	volume: string;
	change: string;
	turnover: string;
	[key: string]: string;
}
export declare const enum LayoutChildType {
	Candle = "candle",
	Indicator = "indicator",
	XAxis = "xAxis"
}
export interface LayoutChild {
	type: LayoutChildType;
	content?: Array<string | IndicatorCreate>;
	options?: PaneOptions;
}
export interface Options {
	layout?: LayoutChild[];
	locale?: string;
	timezone?: string;
	styles?: string | DeepPartial<Styles>;
	customApi?: Partial<CustomApi>;
	thousandsSeparator?: string;
	decimalFoldThreshold?: number;
}
export interface YAxis extends Axis {
	isFromZero: () => boolean;
	isInCandle: () => boolean;
}
export declare enum OverlayMode {
	Normal = "normal",
	WeakMagnet = "weak_magnet",
	StrongMagnet = "strong_magnet"
}
export interface OverlayPerformEventParams {
	currentStep: number;
	mode: OverlayMode;
	points: Array<Partial<Point>>;
	performPointIndex: number;
	performPoint: Partial<Point>;
}
export type OverlayFigureIgnoreEventType = "mouseClickEvent" | "mouseRightClickEvent" | "tapEvent" | "doubleTapEvent" | "mouseDownEvent" | "touchStartEvent" | "mouseMoveEvent" | "touchMoveEvent" | "mouseDoubleClickEvent";
export interface OverlayFigure {
	key?: string;
	type: string;
	attrs: any;
	styles?: any;
	ignoreEvent?: boolean | OverlayFigureIgnoreEventType[];
}
export interface OverlayPrecision extends Precision {
	max: number;
	min: number;
	excludePriceVolumeMax: number;
	excludePriceVolumeMin: number;
	[key: string]: number;
}
export interface OverlayCreateFiguresCallbackParams {
	overlay: Overlay;
	coordinates: Coordinate[];
	bounding: Bounding;
	barSpace: BarSpace;
	precision: OverlayPrecision;
	thousandsSeparator: string;
	decimalFoldThreshold: number;
	dateTimeFormat: Intl.DateTimeFormat;
	defaultStyles: OverlayStyle;
	xAxis: Nullable<XAxis>;
	yAxis: Nullable<YAxis>;
}
export interface OverlayEvent extends Partial<MouseTouchEvent> {
	figureKey?: string;
	figureIndex?: number;
	overlay: Overlay;
}
export type OverlayEventCallback = (event: OverlayEvent) => boolean;
export type OverlayCreateFiguresCallback = (params: OverlayCreateFiguresCallbackParams) => OverlayFigure | OverlayFigure[];
export interface Overlay {
	/**
	 * Unique identification
	 */
	id: string;
	/**
	 * Group id
	 */
	groupId: string;
	/**
	 * Pane id
	 */
	paneId: string;
	/**
	 * Name
	 */
	name: string;
	/**
	 * Total number of steps required to complete mouse operation
	 */
	totalStep: number;
	/**
	 * Current step
	 */
	currentStep: number;
	/**
	 * Whether it is locked. When it is true, it will not respond to events
	 */
	lock: boolean;
	/**
	 * Whether the overlay is visible
	 */
	visible: boolean;
	/**
	 * Draw level
	 */
	zLevel: number;
	/**
	 * Whether the default figure corresponding to the point is required
	 */
	needDefaultPointFigure: boolean;
	/**
	 * Whether the default figure on the Y axis is required
	 */
	needDefaultXAxisFigure: boolean;
	/**
	 * Whether the default figure on the X axis is required
	 */
	needDefaultYAxisFigure: boolean;
	/**
	 * Mode
	 */
	mode: OverlayMode;
	/**
	 * When mode is weak_magnet is the response distance
	 */
	modeSensitivity: number;
	/**
	 * Time and value information
	 */
	points: Array<Partial<Point>>;
	/**
	 * Extended Data
	 */
	extendData: any;
	/**
	 * The style information and format are consistent with the overlay in the unified configuration
	 */
	styles: Nullable<DeepPartial<OverlayStyle>>;
	/**
	 * Create figures corresponding to points
	 */
	createPointFigures: Nullable<OverlayCreateFiguresCallback>;
	/**
	 * Create figures on the Y axis
	 */
	createXAxisFigures: Nullable<OverlayCreateFiguresCallback>;
	/**
	 * Create figures on the X axis
	 */
	createYAxisFigures: Nullable<OverlayCreateFiguresCallback>;
	/**
	 * Special handling callbacks when pressing events
	 */
	performEventPressedMove: Nullable<(params: OverlayPerformEventParams) => void>;
	/**
	 * In drawing, special handling callback when moving events
	 */
	performEventMoveForDrawing: Nullable<(params: OverlayPerformEventParams) => void>;
	/**
	 * Start drawing event
	 */
	onDrawStart: Nullable<OverlayEventCallback>;
	/**
	 * In drawing event
	 */
	onDrawing: Nullable<OverlayEventCallback>;
	/**
	 * Draw End Event
	 */
	onDrawEnd: Nullable<OverlayEventCallback>;
	/**
	 * Click event
	 */
	onClick: Nullable<OverlayEventCallback>;
	/**
	 * Double Click event
	 */
	onDoubleClick: Nullable<OverlayEventCallback>;
	/**
	 * Right click event
	 */
	onRightClick: Nullable<OverlayEventCallback>;
	/**
	 * Pressed move start event
	 */
	onPressedMoveStart: Nullable<OverlayEventCallback>;
	/**
	 * Pressed moving event
	 */
	onPressedMoving: Nullable<OverlayEventCallback>;
	/**
	 * Pressed move end event
	 */
	onPressedMoveEnd: Nullable<OverlayEventCallback>;
	/**
	 * Mouse enter event
	 */
	onMouseEnter: Nullable<OverlayEventCallback>;
	/**
	 * Mouse leave event
	 */
	onMouseLeave: Nullable<OverlayEventCallback>;
	/**
	 * Removed event
	 */
	onRemoved: Nullable<OverlayEventCallback>;
	/**
	 * Selected event
	 */
	onSelected: Nullable<OverlayEventCallback>;
	/**
	 * Deselected event
	 */
	onDeselected: Nullable<OverlayEventCallback>;
}
export type OverlayTemplate = ExcludePickPartial<Omit<Overlay, "id" | "groupId" | "paneId" | "points" | "currentStep">, "name">;
export type OverlayCreate = ExcludePickPartial<Omit<Overlay, "paneId" | "currentStep" | "totalStep" | "createPointFigures" | "createXAxisFigures" | "createYAxisFigures" | "performEventPressedMove" | "performEventMoveForDrawing">, "name">;
export type OverlayRemove = Partial<Pick<Overlay, "id" | "groupId" | "name">>;
export type OverlayConstructor = new () => Overlay;
export declare enum DomPosition {
	Root = "root",
	Main = "main",
	YAxis = "yAxis"
}
export interface ConvertFinder {
	paneId?: string;
	absolute?: boolean;
}
export interface Chart {
	id: string;
	getDom: (paneId?: string, position?: DomPosition) => Nullable<HTMLElement>;
	getSize: (paneId?: string, position?: DomPosition) => Nullable<Bounding>;
	setLocale: (locale: string) => void;
	getLocale: () => string;
	setStyles: (styles: string | DeepPartial<Styles>) => void;
	getStyles: () => Styles;
	setCustomApi: (customApi: Partial<CustomApi>) => void;
	setPriceVolumePrecision: (pricePrecision: number, volumePrecision: number) => void;
	getPriceVolumePrecision: () => Precision;
	setTimezone: (timezone: string) => void;
	getTimezone: () => string;
	setOffsetRightDistance: (distance: number) => void;
	getOffsetRightDistance: () => number;
	setMaxOffsetLeftDistance: (distance: number) => void;
	setMaxOffsetRightDistance: (distance: number) => void;
	setLeftMinVisibleBarCount: (barCount: number) => void;
	setRightMinVisibleBarCount: (barCount: number) => void;
	setBarSpace: (space: number) => void;
	getBarSpace: () => number;
	getVisibleRange: () => VisibleRange;
	clearData: () => void;
	getDataList: () => KLineData[];
	applyNewData: (dataList: KLineData[], more?: boolean, callback?: () => void) => void;
	/**
	 * @deprecated
	 * Since v9.8.0 deprecated, since v10 removed
	 */
	applyMoreData: (dataList: KLineData[], more?: boolean, callback?: () => void) => void;
	updateData: (data: KLineData, callback?: () => void) => void;
	/**
	 * @deprecated
	 * Since v9.8.0 deprecated, since v10 removed
	 */
	loadMore: (cb: LoadMoreCallback) => void;
	setLoadDataCallback: (cb: LoadDataCallback) => void;
	createIndicator: (value: string | IndicatorCreate, isStack?: boolean, paneOptions?: PaneOptions, callback?: () => void) => Nullable<string>;
	overrideIndicator: (override: IndicatorCreate, paneId?: string, callback?: () => void) => void;
	getIndicatorByPaneId: (paneId?: string, name?: string) => Nullable<Indicator> | Nullable<Map<string, Indicator>> | Map<string, Map<string, Indicator>>;
	removeIndicator: (paneId: string, name?: string) => void;
	createOverlay: (value: string | OverlayCreate | Array<string | OverlayCreate>, paneId?: string) => Nullable<string> | Array<Nullable<string>>;
	getOverlayById: (id: string) => Nullable<Overlay>;
	overrideOverlay: (override: Partial<OverlayCreate>) => void;
	removeOverlay: (remove?: string | OverlayRemove) => void;
	setPaneOptions: (options: PaneOptions) => void;
	setZoomEnabled: (enabled: boolean) => void;
	isZoomEnabled: () => boolean;
	setScrollEnabled: (enabled: boolean) => void;
	isScrollEnabled: () => boolean;
	scrollByDistance: (distance: number, animationDuration?: number) => void;
	scrollToRealTime: (animationDuration?: number) => void;
	scrollToDataIndex: (dataIndex: number, animationDuration?: number) => void;
	scrollToTimestamp: (timestamp: number, animationDuration?: number) => void;
	zoomAtCoordinate: (scale: number, coordinate?: Coordinate, animationDuration?: number) => void;
	zoomAtDataIndex: (scale: number, dataIndex: number, animationDuration?: number) => void;
	zoomAtTimestamp: (scale: number, timestamp: number, animationDuration?: number) => void;
	convertToPixel: (points: Partial<Point> | Array<Partial<Point>>, finder: ConvertFinder) => Partial<Coordinate> | Array<Partial<Coordinate>>;
	convertFromPixel: (coordinates: Array<Partial<Coordinate>>, finder: ConvertFinder) => Partial<Point> | Array<Partial<Point>>;
	executeAction: (type: ActionType, data: any) => void;
	subscribeAction: (type: ActionType, callback: ActionCallback) => void;
	unsubscribeAction: (type: ActionType, callback?: ActionCallback) => void;
	getConvertPictureUrl: (includeOverlay?: boolean, type?: string, backgroundColor?: string) => string;
	resize: () => void;
}
export interface AxisTick {
	coord: number;
	value: number | string;
	text: string;
}
export interface AxisRange extends VisibleRange {
	readonly range: number;
	readonly realRange: number;
}
export interface Axis {
	convertToPixel: (value: number) => number;
	convertFromPixel: (px: number) => number;
}
export interface AxisCreateTicksParams {
	range: AxisRange;
	bounding: Bounding;
	defaultTicks: AxisTick[];
}
export type AxisCreateTicksCallback = (params: AxisCreateTicksParams) => AxisTick[];
export interface AxisTemplate {
	name: string;
	createTicks: AxisCreateTicksCallback;
}
export type XAxis = Axis;
export interface Figure<A = any, S = any> {
	name: string;
	attrs: A;
	styles: S;
	draw: (ctx: CanvasRenderingContext2D, attrs: A, styles: S) => void;
	checkEventOn: (coordinate: Coordinate, attrs: A, styles: S) => boolean;
}
export type FigureTemplate<A = any, S = any> = Pick<Figure<A, S>, "name" | "draw" | "checkEventOn">;
export type FigureCreate<A = any, S = any> = Pick<Figure<A, S>, "name" | "attrs" | "styles">;
export type FigureConstructor<A = any, S = any> = new (figure: FigureCreate<A, S>) => ({
	draw: (ctx: CanvasRenderingContext2D) => void;
});
declare function checkCoordinateOnCircle(coordinate: Coordinate, attrs: CircleAttrs | CircleAttrs[]): boolean;
declare function drawCircle(ctx: CanvasRenderingContext2D, attrs: CircleAttrs | CircleAttrs[], styles: Partial<PolygonStyle>): void;
export interface CircleAttrs {
	x: number;
	y: number;
	r: number;
}
declare function checkCoordinateOnArc(coordinate: Coordinate, attrs: ArcAttrs | ArcAttrs[]): boolean;
declare function drawArc(ctx: CanvasRenderingContext2D, attrs: ArcAttrs | ArcAttrs[], styles: Partial<LineStyle>): void;
export interface ArcAttrs extends CircleAttrs {
	startAngle: number;
	endAngle: number;
}
declare function checkCoordinateOnRect(coordinate: Coordinate, attrs: RectAttrs | RectAttrs[]): boolean;
declare function drawRect(ctx: CanvasRenderingContext2D, attrs: RectAttrs | RectAttrs[], styles: Partial<RectStyle>): void;
export interface RectAttrs {
	x: number;
	y: number;
	width: number;
	height: number;
}
declare function checkCoordinateOnText(coordinate: Coordinate, attrs: TextAttrs | TextAttrs[], styles: Partial<TextStyle>): boolean;
declare function drawText(ctx: CanvasRenderingContext2D, attrs: TextAttrs | TextAttrs[], styles: Partial<TextStyle>): void;
export interface TextAttrs {
	x: number;
	y: number;
	text: string;
	width?: number;
	height?: number;
	align?: CanvasTextAlign;
	baseline?: CanvasTextBaseline;
}
export declare enum IndicatorSeries {
	Normal = "normal",
	Price = "price",
	Volume = "volume"
}
export type IndicatorFigureStyle = Partial<Omit<SmoothLineStyle, "style">> & Partial<Omit<RectStyle, "style">> & Partial<TextStyle> & Partial<{
	style: LineType[keyof LineType] | PolygonType[keyof PolygonType];
}> & Record<string, any>;
export type IndicatorFigureAttrs = Partial<ArcAttrs> & Partial<LineStyle> & Partial<RectAttrs> & Partial<TextAttrs> & Record<string, any>;
export interface IndicatorFigureCallbackBrother<PCN> {
	prev: PCN;
	current: PCN;
	next: PCN;
}
export type IndicatorFigureAttrsCallbackCoordinate<D> = IndicatorFigureCallbackBrother<Record<keyof D, number> & {
	x: number;
}>;
export type IndicatorFigureAttrsCallbackData<D> = IndicatorFigureCallbackBrother<D>;
export interface IndicatorFigureAttrsCallbackParams<D> {
	data: IndicatorFigureAttrsCallbackData<Nullable<D>>;
	coordinate: IndicatorFigureAttrsCallbackCoordinate<D>;
	bounding: Bounding;
	barSpace: BarSpace;
	xAxis: XAxis;
	yAxis: YAxis;
}
export interface IndicatorFigureStylesCallbackDataChild<D> {
	kLineData?: KLineData;
	indicatorData?: D;
}
export type IndicatorFigureStylesCallbackData<D> = IndicatorFigureCallbackBrother<IndicatorFigureStylesCallbackDataChild<D>>;
export type IndicatorFigureAttrsCallback<D> = (params: IndicatorFigureAttrsCallbackParams<D>) => IndicatorFigureAttrs;
export type IndicatorFigureStylesCallback<D> = (data: IndicatorFigureStylesCallbackData<D>, indicator: Indicator<D>, defaultStyles: IndicatorStyle) => IndicatorFigureStyle;
export interface IndicatorFigure<D = any> {
	key: string;
	title?: string;
	type?: string;
	baseValue?: number;
	attrs?: IndicatorFigureAttrsCallback<D>;
	styles?: IndicatorFigureStylesCallback<D>;
}
export type IndicatorRegenerateFiguresCallback<D = any> = (calcParams: any[]) => Array<IndicatorFigure<D>>;
export interface IndicatorTooltipData {
	name: string;
	calcParamsText: string;
	icons: TooltipIconStyle[];
	values: TooltipLegend[];
}
export interface IndicatorCreateTooltipDataSourceParams<D = any> {
	kLineDataList: KLineData[];
	indicator: Indicator<D>;
	visibleRange: VisibleRange;
	bounding: Bounding;
	crosshair: Crosshair;
	defaultStyles: IndicatorStyle;
	xAxis: XAxis;
	yAxis: YAxis;
}
export type IndicatorCreateTooltipDataSourceCallback<D = any> = (params: IndicatorCreateTooltipDataSourceParams<D>) => IndicatorTooltipData;
export interface IndicatorDrawParams<D = any> {
	ctx: CanvasRenderingContext2D;
	kLineDataList: KLineData[];
	indicator: Indicator<D>;
	visibleRange: VisibleRange;
	bounding: Bounding;
	barSpace: BarSpace;
	defaultStyles: IndicatorStyle;
	xAxis: XAxis;
	yAxis: YAxis;
}
export type IndicatorDrawCallback<D = any> = (params: IndicatorDrawParams<D>) => boolean;
export type IndicatorCalcCallback<D> = (dataList: KLineData[], indicator: Indicator<D>) => Promise<D[]> | D[];
export interface Indicator<D = any> {
	/**
	 * Indicator name
	 */
	name: string;
	/**
	 * Short name, for display
	 */
	shortName: string;
	/**
	 * Precision
	 */
	precision: number;
	/**
	 * Calculation parameters
	 */
	calcParams: any[];
	/**
	 * Whether ohlc column is required
	 */
	shouldOhlc: boolean;
	/**
	 * Whether large data values need to be formatted, starting from 1000, for example, whether 100000 needs to be formatted with 100K
	 */
	shouldFormatBigNumber: boolean;
	/**
	 * Whether the indicator is visible
	 */
	visible: boolean;
	/**
	 * Z index
	 */
	zLevel: number;
	/**
	 * Extend data
	 */
	extendData: any;
	/**
	 * Indicator series
	 */
	series: IndicatorSeries;
	/**
	 * Figure configuration information
	 */
	figures: Array<IndicatorFigure<D>>;
	/**
	 * Specified minimum value
	 */
	minValue: Nullable<number>;
	/**
	 * Specified maximum value
	 */
	maxValue: Nullable<number>;
	/**
	 * Style configuration
	 */
	styles: Nullable<Partial<IndicatorStyle>>;
	/**
	 * Indicator calculation
	 */
	calc: IndicatorCalcCallback<D>;
	/**
	 * Regenerate figure configuration
	 */
	regenerateFigures: Nullable<IndicatorRegenerateFiguresCallback<D>>;
	/**
	 * Create custom tooltip text
	 */
	createTooltipDataSource: Nullable<IndicatorCreateTooltipDataSourceCallback>;
	/**
	 * Custom draw
	 */
	draw: Nullable<IndicatorDrawCallback<D>>;
	/**
	 * Calculation result
	 */
	result: D[];
}
export type IndicatorTemplate<D = any> = ExcludePickPartial<Omit<Indicator<D>, "result">, "name" | "calc">;
export type IndicatorCreate<D = any> = ExcludePickPartial<Omit<Indicator<D>, "result">, "name">;
declare function checkCoordinateOnLine(coordinate: Coordinate, attrs: LineAttrs | LineAttrs[]): boolean;
declare function getLinearYFromSlopeIntercept(kb: Nullable<number[]>, coordinate: Coordinate): number;
declare function getLinearYFromCoordinates(coordinate1: Coordinate, coordinate2: Coordinate, targetCoordinate: Coordinate): number;
declare function getLinearSlopeIntercept(coordinate1: Coordinate, coordinate2: Coordinate): Nullable<number[]>;
declare function drawLine(ctx: CanvasRenderingContext2D, attrs: LineAttrs | LineAttrs[], styles: Partial<SmoothLineStyle>): void;
export interface LineAttrs {
	coordinates: Coordinate[];
}
declare function checkCoordinateOnPolygon(coordinate: Coordinate, attrs: PolygonAttrs | PolygonAttrs[]): boolean;
declare function drawPolygon(ctx: CanvasRenderingContext2D, attrs: PolygonAttrs | PolygonAttrs[], styles: Partial<PolygonStyle>): void;
export interface PolygonAttrs {
	coordinates: Coordinate[];
}
export declare function getSupportedFigures(): string[];
export declare function registerFigure<A = any, S = any>(figure: FigureTemplate<A, S>): void;
export declare function getFigureClass<A = any, S = any>(name: string): Nullable<FigureConstructor<A, S>>;
export declare function registerIndicator<D>(indicator: IndicatorTemplate<D>): void;
export declare function getSupportedIndicators(): string[];
export declare function registerLocale(locale: string, ls: Locales): void;
export declare function getSupportedLocales(): string[];
export declare function registerOverlay(template: OverlayTemplate): void;
export declare function getOverlayClass(name: string): Nullable<OverlayConstructor>;
export declare function getSupportedOverlays(): string[];
export declare function registerStyles(name: string, ss: DeepPartial<Styles>): void;
export declare function registerXAxis(axis: AxisTemplate): void;
export declare function registerYAxis(axis: AxisTemplate): void;
/**
 * Chart version
 * @return {string}
 */
export declare function version(): string;
/**
 * Init chart instance
 * @param ds
 * @param options
 * @returns {Chart}
 */
export declare function init(ds: HTMLElement | string, options?: Options): Nullable<Chart>;
/**
 * Destroy chart instance
 * @param dcs
 */
export declare function dispose(dcs: HTMLElement | Chart | string): void;
export declare const utils: {
	clone: typeof clone;
	merge: typeof merge;
	isString: typeof isString;
	isNumber: typeof isNumber;
	isValid: typeof isValid;
	isObject: typeof isObject;
	isArray: typeof isArray;
	isFunction: typeof isFunction;
	isBoolean: typeof isBoolean;
	formatValue: typeof formatValue;
	formatPrecision: typeof formatPrecision;
	formatBigNumber: typeof formatBigNumber;
	formatDate: typeof formatDate;
	formatThousands: typeof formatThousands;
	formatFoldDecimal: typeof formatFoldDecimal;
	calcTextWidth: typeof calcTextWidth;
	getLinearSlopeIntercept: typeof getLinearSlopeIntercept;
	getLinearYFromSlopeIntercept: typeof getLinearYFromSlopeIntercept;
	getLinearYFromCoordinates: typeof getLinearYFromCoordinates;
	checkCoordinateOnArc: typeof checkCoordinateOnArc;
	checkCoordinateOnCircle: typeof checkCoordinateOnCircle;
	checkCoordinateOnLine: typeof checkCoordinateOnLine;
	checkCoordinateOnPolygon: typeof checkCoordinateOnPolygon;
	checkCoordinateOnRect: typeof checkCoordinateOnRect;
	checkCoordinateOnText: typeof checkCoordinateOnText;
	drawArc: typeof drawArc;
	drawCircle: typeof drawCircle;
	drawLine: typeof drawLine;
	drawPolygon: typeof drawPolygon;
	drawRect: typeof drawRect;
	drawText: typeof drawText;
	drawRectText: typeof drawText;
};

export as namespace klinecharts;

export {};
