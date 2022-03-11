import { maska } from "maska";
import { ViteModule } from "@/@types";

export const install: ViteModule = ({ app }) => {
  app.directive("mask", maska);
};
