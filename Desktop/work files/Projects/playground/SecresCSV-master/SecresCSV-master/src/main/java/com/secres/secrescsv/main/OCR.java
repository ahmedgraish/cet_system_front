package com.secres.secrescsv.main;

import com.secres.secrescsv.ext.EdgeDetection;
import com.secres.secrescsv.ext.subimageConst;
import com.opencsv.CSVWriter;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.imageio.ImageIO;
import javax.swing.JOptionPane;
import javax.swing.JTextPane;
import net.sourceforge.tess4j.*;
import org.imgscalr.Scalr;
import org.imgscalr.Scalr.Rotation;

public class OCR {

    private static final Tesseract instance = new Tesseract();  // JNA Interface Mapping
    private JTextPane textPane = new JTextPane();

    public BufferedImage imagePreprocess(BufferedImage image) {

        BufferedImage bwImage = new BufferedImage(
                image.getWidth(),
                image.getHeight(),
                BufferedImage.TYPE_BYTE_BINARY);
        Graphics2D g = bwImage.createGraphics();
        g.drawImage(image, 0, 0, null);
        g.dispose();

        return bwImage;
    }

    public BufferedImage imageSnipp(int x, int y, int width, int height, int xDisplacement, int yDisplacement, String path) throws IOException {

        BufferedImage image = ImageIO.read(new File(path));

        BufferedImage subImage = Scalr.crop(image, x + xDisplacement, y + yDisplacement, width, height);
        return imagePreprocess(subImage);

    }

    public List<String> ocrScan(List<BufferedImage> subimages, String fileName) {

        List<String> rawData = new ArrayList<>();

//        instance.setDatapath("src/main/resources/tessdata"); // path to tessdata directory
//        instance.setLanguage("eng");
//        instance.setTessVariable("tessedit_char_whitelist", "0123456789-");
//        instance.setPageSegMode(6);
//        instance.setOcrEngineMode(0);
//        instance.setTessVariable("user_defined_dpi", "70");
        rawData.add(fileName);
        for (BufferedImage subimage : subimages) {

            try {
                String result = instance.doOCR(subimage);
                result = result.replace(" ", "");
                result = result.replace(".", "");
                result = result.replace("+", "");
                result = result.replace(":", "");
                result = result.replace("?", "");

                String[] parts = result.split("[^A-Za-z0-9]+");
                rawData.addAll(Arrays.asList(parts));

            } catch (TesseractException e) {
                System.err.println(e.getMessage());
                System.out.println("Error scanning the image...");
            }
        }

        List<String> filtredRawData = new ArrayList<>();
        for (String item : rawData) {
            if (!item.equals(" ") && !item.equals("")) {
                filtredRawData.add(item);
            }
        }
        return filtredRawData;
    }

    private void tessInitialization() {
        instance.setDatapath("C:\\tessdata"); // path to tessdata directory
        instance.setLanguage("eng");
        instance.setTessVariable("tessedit_char_whitelist", "0123456789-");
        instance.setPageSegMode(6);
        instance.setOcrEngineMode(0);
        instance.setTessVariable("user_defined_dpi", "70");
    }

    public List<String> StartOcr(String sourceDirPath, String outputDirPath) throws IOException {

        subimageConst formRefNum_PgNum = new subimageConst(30, 475, 380, 115);
        subimageConst familyNum = new subimageConst(1180, 235, 190, 80);
        subimageConst familyRegNum = new subimageConst(1650, 230, 230, 85);
        subimageConst formPgRef = new subimageConst(3250, 0, 125, 380);

        tessInitialization();

        File officeDir = new File(sourceDirPath);
        List<String> csvPaths = new ArrayList<>();

        if (officeDir.isDirectory()) {

            List<String[]> ToCsvList = new ArrayList<>();
            String[] csvHeader = {"Errors", "File Name", "Form ID", "page number", "office number", "Family number", "Family reg number", "page serial Number"};
            List<BufferedImage> imageSnippets = new ArrayList<>();

            for (File imageDir : officeDir.listFiles()) {

                if (imageDir.isDirectory()) {
                    ToCsvList.add(csvHeader);

                    System.out.println("Start scanning in the office " + officeDir.getName() + " the packge Number " + imageDir.getName());
//                    List<String[]> SrNumChecking =new ArrayList<>();

                    for (File imageFile : imageDir.listFiles()) {

                        textPane.setText(+"الباقة "+officeDir.getName()+"تمت عملية استخراج البيانات للمكتب ");
                        JOptionPane.showMessageDialog(View.getFrame(), textPane, "خطأ", JOptionPane.ERROR_MESSAGE);
                        if (imageFile.isFile() && imageFile.getName().matches("^(.*?)F(.*?).jpg$")) {
                            String currentImagePath = imageFile.getAbsolutePath();

                            // to reduce the area of the detection
                            BufferedImage bwImage = imageSnipp(0, 0, 500, 500, 0, 0, currentImagePath);
                            EdgeDetection detector = new EdgeDetection();
                            int[] topLeftEdge = detector.printEdgesTest(bwImage, false, false, 2, 2);
                            int xDisplacement = topLeftEdge[0];
                            int yDisplacement = topLeftEdge[1];

                            BufferedImage formID = imageSnipp(formRefNum_PgNum.X, formRefNum_PgNum.Y, formRefNum_PgNum.WIDTH, formRefNum_PgNum.HEIGHT, xDisplacement, yDisplacement, currentImagePath);
                            imageSnippets.add(formID);
//                            ImageIO.write(formID, "jpg", new File("D:\\TaskTests\\result of 12\\" + imageFile.getName().replace("F", "refNum")));

                            BufferedImage familyRefNum = imageSnipp(familyNum.X, familyNum.Y, familyNum.WIDTH, familyNum.HEIGHT, xDisplacement, yDisplacement, currentImagePath);
                            imageSnippets.add(familyRefNum);
//                            ImageIO.write(familyRefNum, "jpg", new File("D:\\TaskTests\\result of 12\\" + imageFile.getName().replace("F", "familyRefNum")));

                            BufferedImage regNum = imageSnipp(familyRegNum.X, familyRegNum.Y, familyRegNum.WIDTH, familyRegNum.HEIGHT, xDisplacement, yDisplacement, currentImagePath);
                            imageSnippets.add(regNum);
//                            ImageIO.write(regNum, "jpg", new File("D:\\TaskTests\\result of 12\\" + imageFile.getName().replace("F", "regNum")));

                            BufferedImage toGetWidth = ImageIO.read(new File(currentImagePath));
                            int maxWidth = toGetWidth.getWidth() - (3250 + xDisplacement) - 2;
                            BufferedImage pgSerialNum = imageSnipp(formPgRef.X, formPgRef.Y, maxWidth, formPgRef.HEIGHT, xDisplacement, 50, currentImagePath);
                            pgSerialNum = Scalr.rotate(pgSerialNum, Rotation.CW_90);
                            imageSnippets.add(pgSerialNum);
//                            ImageIO.write(pgSerialNum, "jpg", new File("D:\\TaskTests\\result of 12\\" + imageFile.getName().replace("F", "pgRef")));

                            List<String> rawData = ocrScan(imageSnippets, imageFile.getName());
                            if (rawData.size() != 7 || rawData.get(1).length() > 8 || xDisplacement == 0 || rawData.getLast().length() > 10) {
                                rawData.addFirst("تحتاج الى مراجعة");
                            } else {
                                rawData.addFirst(" ");
//                                String[] srNameComp = {imageFile.getName().split("-")[0], rawData.get(7)};
//                                SrNumChecking.add(srNameComp);
                            }
                            ToCsvList.add(rawData.toArray(String[]::new));

                            System.out.println("------------------------------------------------------");
                            System.out.println("this is the list of " + imageFile.getName() + " -----> " + rawData);
                            System.out.println("the topLeftEdge is at :" + Arrays.toString(topLeftEdge));

                            imageSnippets.clear();
                        }
                    }

                    try {
                        CSVWriter writer = new CSVWriter(new FileWriter(outputDirPath + "\\" + imageDir.getName() + ".csv"));
                        writer.writeAll(ToCsvList);
                        writer.close();
                        ToCsvList.clear();
                        csvPaths.add((outputDirPath + "\\" + imageDir.getName() + ".csv"));

                    } catch (IOException e) {
                        System.out.println(e);
                    }

                } else {
                    System.out.println("Error: Sub Directory not found!");
                }
            }
            return csvPaths;

        } else {
            System.out.println("Error: Parent Directory not found!");
        }
        csvPaths.add(sourceDirPath);
        return csvPaths;
    }

}
