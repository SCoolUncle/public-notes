## svg


## canvas

1. canvas 非矢量
2. 使用height 和 width 属性 控制宽高实际上也定义了宽高比， 如果重新通过style方式控制宽高则会导致图像拉伸或者扭曲

> Q:echarts 是如何通过canvas绘制图表的？
Echarts 在 canvas 绘制库 ZRender 的上层进行继续封装

  
1. moveTo(x,y) 移动笔触， 将笔触移动到指定位置
2. lineTo(x,y) 绘制直线
3. arc(x,y radius, startAngle, endAngle, anticlockwise) 圆弧
4. bezierCurveTo() 贝塞尔曲线 二次贝塞尔曲线
5. quadraticCurveTo 三次贝塞尔曲线
6. Path2d 用来缓存或者记录绘画命令， 可以理解为一个绘画模版


> 路径使用填充fill()时， 会自动闭合路径， 如果使用stroke(描边)则需要手动闭合路径closePath()
>

## canvas 和 svg 的区别

1. 操作对象， canvas操作的是像素， 性能优先自由端优先， 因为绘制的是基本像素，所以性能消耗会小
2. XML矢量描述标签， dom, 缩放还原度优先， 

**场景**
剪映、大数据量可视化、流程图编辑


## WebGL

> OpenGL: 
> OpenGl是一种跨平台的图形编程接口

**流程**
1. 获取定点坐标
   1. 定义几何体
   2. 生成定点坐标
   3. 写入缓存区 -> 显卡缓存， 任务量比较大，更快地读取速度
2. 图元装配（即画出一个三角形）
   1. 
3. 光栅化（生成片元， 即一个个像素点）
   1. 图元生成片元
   2. 片元着色
   3. 光栅化

## Three js

ThreeJs提供了更简单、 高级的方式来创建和渲染3D场景。 提供了许多有用的功能和工具， 如相机、灯管、几何体、纹理映射、动画等，使开发者能够轻松的构建复杂的3D场景j

**绘制步骤**
1. 创建场景Scence new THREE.scence
2. 配置场景
   1. 灯光 SpotLight
   2. 相机 PerspectiveCamera
3. 创建模型
   1. Geometry / BufferGeometry
4. 创建材质
   1. 内置材质 MeshBasicMaterial
   2. 自定义材质 ShaderMaterial
5. 生成着色器
   1. 定点着色器（决定形状）
   2. 片元着色器（决定质地）
6. 渲染