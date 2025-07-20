import { Effect } from "postprocessing";
import * as THREE from "three";
import ditheringShader from "../shaders/model/fragment.glsl";

export class DitheringEffect extends Effect {
  constructor({
    time = 0, // tiempo
    resolution = new THREE.Vector2(1, 1), // resolucion
    gridSize = 4.0, // Tamaño del patrón
    luminanceMethod = 0, // Método de luminancia
    invertColor = false, // Invertir colores
    pixelSizeRatio = 1, // Multiplicador de pixelación
    grayscaleOnly = false, // Solo escala de grises
  } = {}) {
    const uniforms = new Map([
      ["u_time", new THREE.Uniform(time)],
      ["u_resolution", new THREE.Uniform(resolution)],
      ["u_gridSize", new THREE.Uniform(gridSize)],
      ["u_luminanceMethod", new THREE.Uniform(luminanceMethod)],
      ["u_invertColor", new THREE.Uniform(invertColor ? 1 : 0)], // Bool → Float
      ["u_ditheringEnabled", new THREE.Uniform(1)], // Siempre habilitado
      ["u_pixelSizeRatio", new THREE.Uniform(pixelSizeRatio)],
      ["u_grayscaleOnly", new THREE.Uniform(grayscaleOnly ? 1 : 0)],
    ]);

    super("DitheringEffect", ditheringShader, { uniforms });
    this.uniforms = uniforms;
  }

  update(renderer, inputBuffer, deltaTime) {
    // ::::::: ACTUALIZAR TIEMPO :::::::
    const timeUniform = this.uniforms.get("u_time");
    if (timeUniform !== undefined && typeof timeUniform.value === "number") {
      timeUniform.value += deltaTime; // Tiempo acumulativo
    }

    // :::::: ACTUALIZAR RESOLUCIÓN ::::::
    // Importante: debe coincidir con el render target actual
    const resolutionUniform = this.uniforms.get("u_resolution");
    if (
      resolutionUniform !== undefined &&
      resolutionUniform.value instanceof THREE.Vector2
    ) {
      resolutionUniform.value.set(
        inputBuffer.width, // Ancho del buffer
        inputBuffer.height, // Alto del buffer
      );
    }
  }

  // Cambiar tamaño del patrón en tiempo real
  setGridSize(size) {
    const gridSizeUniform = this.uniforms.get("u_gridSize");
    if (gridSizeUniform !== undefined) {
      gridSizeUniform.value = size; // Actualiza uniform en GPU
    }
  }

  // Cambiar intensidad de pixelación
  setPixelSizeRatio(ratio) {
    const pixelSizeRatioUniform = this.uniforms.get("u_pixelSizeRatio");
    if (pixelSizeRatioUniform !== undefined) {
      pixelSizeRatioUniform.value = ratio;
    }
  }

  // Activar/desactivar escala de grises
  setGrayscaleOnly(grayscaleOnly) {
    const grayscaleOnlyUniform = this.uniforms.get("u_grayscaleOnly");
    if (grayscaleOnlyUniform !== undefined) {
      grayscaleOnlyUniform.value = grayscaleOnly ? 1 : 0; // Bool → Float
    }
  }

  // Activar/desactivar inversión
  setInvertColor(invert) {
    const invertColorUniform = this.uniforms.get("u_invertColor");
    if (invertColorUniform !== undefined) {
      invertColorUniform.value = invert ? 1 : 0;
    }
  }
}
