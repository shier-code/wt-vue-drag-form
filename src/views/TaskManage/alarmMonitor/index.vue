<!--
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-12-01 14:32:01
 * @LastEditors: went
 * @LastEditTime: 2022-02-10 11:34:15
-->
<template>
  <div class="">
    <button
      class="btn"
      @click="setMode('POINT')"
    >画点</button>
    <button
      class="btn"
      @click="setMode('CIRCLE')"
    >画圆</button>
    <button
      class="btn"
      @click="setMode('POLYLINE')"
    >画线</button>
    <button
      class="btn"
      @click="setMode('POLYGON')"
    >画矩形</button>
    <button
      class="btn"
      @click="createLine()"
    >自动连线</button>
    <div id="map"></div>
  </div>
</template>
 
<script>
import AILabel from 'ailabel'
export default {
  name: '',
  components: {},
  data() {
    return {
      gMap: null,
      center: { x: 350, y: 210 }, // 为了让图片居中
      zoom: 705,
      mode: 'PAN', // PAN 可以平移和放大缩小   ban  可以平移 
      refreshDelayWhenZooming: true, // 缩放时是否允许刷新延时，性能更优
      zoomWhenDrawing: true,
      panWhenDrawing: false,
      zoomWheelRatio: 5, // 控制滑轮缩放缩率[0, 10), 值越小，则缩放越快，反之越慢
      withHotKeys: true // 关闭快捷键
    }
  },
  computed: {

  },
  mounted() {
    this.initMap()
  },
  methods: {
    createLine() {
      const data = [
        { x: 1, y: 1 },
        { x: 100, y: 200 },
        { x: 230, y: 150 },
        { x: 300, y: 200 },
        { x: 200, y: 200 }]
      const drawingStyle = { strokeStyle: '#FF1493', lineJoin: 'round', lineCap: 'round', lineWidth: 1 }
      const polylineFeature = new AILabel.Feature.Polyline(
        `${+new Date()}`, // id
        { points: data }, // shape
        { name: '第一个矢量图层' }, // props
        drawingStyle // style drawingStyle 这里可以改变图形或者线的颜色 动态赋值
      );
      console.log('data====', data);

      this.gFirstFeatureLayer.addFeature(polylineFeature);
    },

    initMap() {
      // npm i ailabel
      let drawingStyle = {}; // 绘制过程中样式
      const gMap = new AILabel.Map('map', {
        center: { x: 100, y: 100 }, // 为了让图片居中
        zoom: 1000,
        mode: 'PAN', // PAN 可以平移和放大缩小   ban  可以平移 
        refreshDelayWhenZooming: true, // 缩放时是否允许刷新延时，性能更优
        zoomWhenDrawing: true,
        panWhenDrawing: false,
        zoomWheelRatio: 5, // 控制滑轮缩放缩率[0, 10), 值越小，则缩放越快，反之越慢
        withHotKeys: true // 关闭快捷键
      });
      // 图片层添加
      const gFirstImageLayer = new AILabel.Layer.Image(
        'layer-image', // id
        {
          src: require('../../../assets/img/404.png'),
          width: 700,
          height: 500,
          crossOrigin: false, // 如果跨域图片，需要设置为true
          position: { // 左上角相对中心点偏移量
            x: 0,
            y: 0
          }
        }, // imageInfo
        { name: '第一个图片图层' }, // props
        { zIndex: 1 } // 这里写样式 层级
      );
      // click单击事件 这里可以直接修改单击触发 比如如果没触发可以直接把事件放进来写成单击一个点渲染
      gMap.events.on('click', point => {
        console.log('--click--', point);
      });
      // data 代表r半径shape；data1代表sr半径shape
      gMap.events.on('drawDone', (type, data, data1) => {
        if (type === 'MARKER') {
          const marker = new AILabel.Marker(
            `${+new Date()}`, // id
            {
              src: '',
              position: data,
              offset: {
                x: 0,
                y: 0
              }
            }, // markerInfo
            { name: '第一个marker注记' } // props
          );
          marker.events.on('click', marker => {
            gMap.markerLayer.removeMarkerById(marker.id);
          });
          gMap.markerLayer.addMarker(marker);
        } else if (type === 'POINT') {
          // 创建图层 然后实例在图片上
          const pointFeature = new AILabel.Feature.Point(
            `${+new Date()}`, // id
            { ...data, sr: 10 }, // shape
            { name: '第一个矢量图层' }, // props
            { fillStyle: '#00f' } // style
          );
          gFirstFeatureLayer.addFeature(pointFeature);
        } else if (type === 'LINE') {
          const scale = gMap.getScale();
          const width = drawingStyle.lineWidth / scale;
          const lineFeature = new AILabel.Feature.Line(
            `${+new Date()}`, // id
            { ...data, width }, // shape
            { name: '第一个矢量图层' }, // props
            drawingStyle // style
          );
          gFirstFeatureLayer.addFeature(lineFeature);
        } else if (type === 'POLYLINE') {
          const scale = gMap.getScale();
          const width = drawingStyle.lineWidth / scale;
          const polylineFeature = new AILabel.Feature.Polyline(
            `${+new Date()}`, // id
            { points: data, width }, // shape
            { name: '第一个矢量图层' }, // props
            drawingStyle // style drawingStyle 这里可以改变图形或者线的颜色 动态赋值
          );
          console.log('data====', data);

          gFirstFeatureLayer.addFeature(polylineFeature);
        } else if (type === 'RECT') {
          const rectFeature = new AILabel.Feature.Rect(
            `${+new Date()}`, // id
            data, // shape
            { name: '矢量图形' }, // props
            { fillStyle: '#F4A460', strokeStyle: '#D2691E', lineWidth: 2 } // style
          );
          gFirstFeatureLayer.addFeature(rectFeature);
        } else if (type === 'POLYGON') {
          const polygonFeature = new AILabel.Feature.Polygon(
            `${+new Date()}`, // id
            { points: data }, // shape
            { name: '矢量图形' }, // props
            { strokeStyle: '#00f', fillStyle: '#0f0', globalAlpha: 0.1, lineWidth: 1, fill: true } // style fill 图形中阴影 globalAlpha 阴影的显示程度 strokeStyle 线的颜色 fillStyle 阴影的颜色 
          );
          gFirstFeatureLayer.addFeature(polygonFeature);
        } else if (type === 'CIRCLE') {
          const circleFeature = new AILabel.Feature.Circle(
            `${+new Date()}`, // id
            data, // data1代表屏幕坐标 shape
            { name: '第一个矢量图层' }, // props
            { fillStyle: '#F4A460', strokeStyle: '#D2691E', lineWidth: 2 } // style
          );
          gFirstFeatureLayer.addFeature(circleFeature);
        }
      }
      );
      // 视野范围发生变化
      gMap.events.on('boundsChanged', data => {
        // console.log('--map boundsChanged--');
        return 2222;
      });
      // 在绘制模式下双击feature触发选中
      gMap.events.on('featureSelected', feature => {
        this.getid(feature.id)
        // gMap.setActiveFeature(feature);
      });
      gMap.events.on('featureUnselected', () => {
        // 取消featureSelected
        gMap.setActiveFeature(null);
      });
      gMap.events.on('featureUpdated', (feature, shape) => {
        feature.updateShape(shape);
        const markerId = feature.props.deleteMarkerId;
        const targetMarker = gMap.markerLayer.getMarkerById(markerId);
        targetMarker.updatePosition(feature.getPoints()[1]);
      });
      gMap.events.on('featureDeleted', ({ id: featureId }) => {
        gFirstFeatureLayer.removeFeatureById(featureId);
      });


      // 图片层相关事件监听
      gFirstImageLayer.events.on('loadStart', (a, b) => {
        console.log('--loadStart--', a, b);
      });
      gFirstImageLayer.events.on('loadEnd', (a, b) => {
        console.log('--loadEnd--', a, b);
      });
      gFirstImageLayer.events.on('loadError', (a, b) => {
        console.log('--loadError--', a, b);
      });
      // 添加到gMap对象
      gMap.addLayer(gFirstImageLayer);

      const gFirstFeatureLayer = new AILabel.Layer.Feature(
        'first-layer-feature', // id
        { name: '第一个矢量图层' }, // props
        { zIndex: 10 } // style
      );
      gMap.addLayer(gFirstFeatureLayer);
      const gFirstTextLayer = new AILabel.Layer.Text(
        'first-layer-text', // id
        { text: '这是一给文字', position: { x: 300, y: 300 }},
        { name: '第一个文本图层' }, // props
        { fillStyle: '#F4A460', strokeStyle: '#D2691E', background: true, globalAlpha: 1, fontColor: '#0f0' } // style
      );
      gMap.addLayer(gFirstTextLayer);

      //自适应
      this.gFirstFeatureLayer = gFirstFeatureLayer;
      this.gMap = gMap;
      window.onresize = function () {
        gMap && gMap.resize();
      };
    },
    // 触发 工具功能 类型会自动触发工具内对应渲染的图形
    setMode(mode) {
      this.gMap.setMode(mode);
      //  动态颜色可以在这里赋值 精确到某一个操作
      var drawingStyle
      // 后续对应模式处理
      switch (mode) {
        case 'PAN': {
          break;
        }
        case 'MARKER': {
          // 忽略
          break;
        }
        case 'POINT': {
          drawingStyle = { fillStyle: '#9370DB', strokeStyle: '#f00' };
          this.gMap.setDrawingStyle(drawingStyle);
          break;
        }
        case 'CIRCLE': {
          drawingStyle = { fillStyle: '#9370DB', strokeStyle: '#f00', lineWidth: 2 };
          this.gMap.setDrawingStyle(drawingStyle);
          break;
        }
        case 'LINE': {
          drawingStyle = { strokeStyle: '#FF0000', lineJoin: 'round', lineCap: 'round', lineWidth: 5, arrow: false };
          this.gMap.setDrawingStyle(drawingStyle);
          break;
        }
        case 'POLYLINE': {
          drawingStyle = { strokeStyle: '#FF1493', lineJoin: 'round', lineCap: 'round', lineWidth: 1 }
          this.gMap.setDrawingStyle(drawingStyle);
          break;
        }
        case 'RECT': {
          drawingStyle = { strokeStyle: '#f00', lineWidth: 1 }
          this.gMap.setDrawingStyle(drawingStyle);
          break;
        }
        case 'POLYGON': {
          drawingStyle = { strokeStyle: '#00f', fillStyle: '#0f0', globalAlpha: 0.3, lineWidth: 1, fill: true, stroke: true }
          this.gMap.setDrawingStyle(drawingStyle);
          break;
        }
        // case 'DRAWMASK': {
        //     drawingStyle = {strokeStyle: 'rgba(255, 0, 0, .5)', fillStyle: '#00f', lineWidth: 50}
        //     this.gMap.setDrawingStyle(drawingStyle);
        //     break;
        // }
        // case 'CLEARMASK': {
        //     drawingStyle = {fillStyle: '#00f', lineWidth: 30}
        //     this.gMap.setDrawingStyle(drawingStyle);
        //     break;
        // }
        case 'TEXT': {
          drawingStyle = { fillStyle: '#00f', lineWidth: 30 }
          this.gMap.setDrawingStyle(drawingStyle);
          break;
        }
        default:
          break;
      }
    }
  }
}
</script>
 
<style scoped lang = "less">
.btn {
  margin-right: 20px;
}
#map {
  overflow: hidden;
  position: relative;
  height: 600px;
  border: 1px dashed #ccc;
}
</style>