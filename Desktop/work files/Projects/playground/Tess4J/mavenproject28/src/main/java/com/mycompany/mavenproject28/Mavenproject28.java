package com.mycompany.mavenproject28;

import com.asprise.ocr.Ocr;
import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.imageio.ImageIO;
import net.sourceforge.tess4j.*;
import org.bytedeco.opencv.opencv_core.Mat;
import org.imgscalr.Scalr;
import org.imgscalr.Scalr.Rotation;
import org.opencv.imgproc.Imgproc;

public class Mavenproject28 {

    public interface RefNum_PgNum {

        int X = 190;
        int Y = 558;
        int WIDTH = 226;
        int HEIGHT = 80;
    }

    public interface RegNum {

        int X = 1750;
        int Y = 320;
        int WIDTH = 230;
        int HEIGHT = 90;
    }

    public interface PgRef {

        int X = 3370;
        int Y = 80;
        int WIDTH = 100;
        int HEIGHT = 260;

    }

    public static BufferedImage imageSnipp(int x, int y, int width, int height, String path) throws IOException {

        // Define the path to your image file
        // Read the image into a BuffeerdImage object
        BufferedImage image = ImageIO.read(new File(path));

        // Extract the sub-image using getSubimage method
//        BufferedImage subImage = image.getSubimage(x, y, width, height);
        BufferedImage subImage = Scalr.crop(image, x, y, width, height);
        BufferedImage grayscaleImage = new BufferedImage(subImage.getWidth(), subImage.getHeight(), BufferedImage.TYPE_BYTE_GRAY);
        Graphics2D g2d = grayscaleImage.createGraphics();
        g2d.drawImage(subImage, 0, 0, Color.WHITE, null);
        g2d.dispose();

        return grayscaleImage;
    }

//    public static List<String> imageScan_v2(List<BufferedImage> subimages) {
//
//        List<String> rawData = new ArrayList<>();
//
//        Ocr.setUp(); // one time setup
//        Ocr ocr = new Ocr(); // create a new OCR engine
//        ocr.startEngine("eng", Ocr.SPEED_FASTEST); // English
//
//        for (BufferedImage subimage : subimages) {
//
//            String result = ocr.recognize(subimage,
//                    Ocr.RECOGNIZE_TYPE_ALL, Ocr.OUTPUT_FORMAT_PLAINTEXT); // PLAINTEXT | XML | PDF | RTF
//            result = result.replace(" ", "");
//            result = result.replace(".", "");
//            result = result.replace("+", "");
//            result = result.replace(":", "");
//            String[] resultArray = result.split("-");
//            rawData.addAll(Arrays.asList(resultArray));
//        }
//        ocr.stopEngine();
//
//        return rawData;
//    }
    public static List<String> imageScan(List<BufferedImage> subimages) {

        List<String> rawData = new ArrayList<>();

        Tesseract instance = new Tesseract();  // JNA Interface Mapping
        instance.setTessVariable("tessedit_char_whitelist=", "0123456789-");
        instance.setDatapath("d:\\TaskTests\\tessdata"); // path to tessdata directory
        instance.setLanguage("ara+eng");

        for (BufferedImage subimage : subimages) {

            try {
                String result = instance.doOCR(subimage);
//                result = result.replaceAll(" ,.+: ", "");
                result = result.replace(" ", "");
                result = result.replace(".", "");
                result = result.replace("+", "");
                result = result.replace(":", "");

                String[] resultArray = result.split("-");
                rawData.addAll(Arrays.asList(resultArray));

            } catch (TesseractException e) {
                System.err.println(e.getMessage());
                System.out.println("Error scanning the image...");
            }
        }

        return rawData;
    }

    public static void main(String[] args) throws IOException {

//        String imageDirPath = "D:\\TaskTests\\forms";  // Replace with your actual directory path
//        File imageDir = new File(imageDirPath);
//        if (imageDir.isDirectory()) {
//            List<BufferedImage> imageSnippets = new ArrayList<>();
//            for (File imageFile : imageDir.listFiles()) {
//                if (imageFile.isFile() && imageFile.getName().matches("^(.*?)F(.*?).jpg$")) {
//                    // Process each image file here
//                    String currentImagePath = imageFile.getAbsolutePath();
//
//                    BufferedImage refNum = imageSnipp(RefNum_PgNum.X, RefNum_PgNum.Y, RefNum_PgNum.WIDTH, RefNum_PgNum.HEIGHT, currentImagePath);
//                    imageSnippets.add(refNum);
//                    ImageIO.write(refNum, "jpg", new File("D:\\TaskTests\\refs\\" + imageFile.getName().replace("F", "refNum")));
//
//                    BufferedImage regNum = imageSnipp(RegNum.X, RegNum.Y, RegNum.WIDTH, RegNum.HEIGHT, currentImagePath);
//                    imageSnippets.add(regNum);
//                    ImageIO.write(regNum, "jpg", new File("D:\\TaskTests\\refs\\" + imageFile.getName().replace("F", "regNum")));
//
//                    BufferedImage pgRef = imageSnipp(PgRef.X, PgRef.Y, PgRef.WIDTH, PgRef.HEIGHT, currentImagePath);
//                    pgRef = Scalr.rotate(pgRef, Rotation.CW_90);
//                    imageSnippets.add(pgRef);
//                    ImageIO.write(pgRef, "jpg", new File("D:\\TaskTests\\refs\\" + imageFile.getName().replace("F", "pgRef")));
//                    
//                    System.out.println("------------------------------------------------------");
//                    System.out.print("this is the list of " + imageFile.getName() + " -----> " + imageScan(imageSnippets));
//                    imageSnippets.clear();
//                }
//            }
//        } else {
//            System.out.println("Error: Directory not found!");
//        }
//        BufferedImage image = ImageIO.read(new File("D:\\TaskTests\\00713944-01-F.jpg"));
//        Imgproc.
//        Mat grayScale = new Mat();
//        Imgproc.cvtColor(image, grayScale, Imgproc.COLOR_BGR2GRAY);   
//        try {
//            BufferedImage input = ImageIO.read(new File(imgFileName));
//            BufferedImage output = JCanny.CannyEdges(input, CANNY_STD_DEV, CANNY_THRESHOLD_RATIO);
//            ImageIO.write(output, imgExt, new File(imgOutFile));
//        } catch (Exception ex) {
//            System.out.println("ERROR ACCESING IMAGE FILE:\n" + ex.getMessage());
//        }
    }
}
