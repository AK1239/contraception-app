import {
  getNextSection,
  getPreviousSection,
  getFirstSection,
  hasCompletedAllSections,
} from "../sectionNavigation";

describe("sectionNavigation", () => {
  describe("getFirstSection", () => {
    it("returns first section key", () => {
      expect(getFirstSection()).toBe("menstrual-history");
    });
  });

  describe("getNextSection", () => {
    it("returns null when currentSection is null", () => {
      expect(getNextSection(null)).toBe("menstrual-history");
    });

    it("returns next section in order", () => {
      expect(getNextSection("menstrual-history")).toBe("pregnancy-history");
      expect(getNextSection("pregnancy-history")).toBe("cvs-risk-factors");
      expect(getNextSection("cvs-risk-factors")).toBe("prothrombotic");
    });

    it("returns null when at last section", () => {
      const lastSection = "medication-history";
      expect(getNextSection(lastSection)).toBeNull();
    });
  });

  describe("getPreviousSection", () => {
    it("returns null when currentSection is null", () => {
      expect(getPreviousSection(null)).toBeNull();
    });

    it("returns null when at first section", () => {
      expect(getPreviousSection("menstrual-history")).toBeNull();
    });

    it("returns previous section in order", () => {
      expect(getPreviousSection("pregnancy-history")).toBe("menstrual-history");
      expect(getPreviousSection("cvs-risk-factors")).toBe("pregnancy-history");
      expect(getPreviousSection("medication-history")).toBe("comorbidities");
    });
  });

  describe("hasCompletedAllSections", () => {
    it("returns false when not at last section", () => {
      expect(hasCompletedAllSections("menstrual-history")).toBe(false);
      expect(hasCompletedAllSections("pregnancy-history")).toBe(false);
    });

    it("returns true when at last section", () => {
      expect(hasCompletedAllSections("medication-history")).toBe(true);
    });

    it("returns false when currentSection is null (not at any section)", () => {
      // getNextSection(null) returns first section, so next !== null => not completed
      expect(hasCompletedAllSections(null)).toBe(false);
    });
  });
});
