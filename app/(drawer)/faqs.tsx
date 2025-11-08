import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, List, Divider, Searchbar, Surface } from "react-native-paper";

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  // App-related FAQs
  {
    id: "app-1",
    category: "About ContraSafe",
    question: "What is ContraSafe and how does it work?",
    answer:
      "ContraSafe is a digital tool that provides personalized contraceptive recommendations based on WHO Medical Eligibility Criteria 2015. It assesses your medical history and personal preferences to suggest safe and suitable contraceptive methods for you.",
  },
  {
    id: "app-2",
    category: "About ContraSafe",
    question: "Is ContraSafe a replacement for seeing a doctor?",
    answer:
      "No, ContraSafe is an educational tool that complements, but does not replace, professional medical advice. Always consult with a qualified healthcare provider before making decisions about contraceptive methods or your reproductive health.",
  },
  {
    id: "app-3",
    category: "About ContraSafe",
    question: "How accurate are the recommendations?",
    answer:
      "ContraSafe recommendations are based on WHO Medical Eligibility Criteria 2015, which is the international gold standard for contraceptive safety. However, individual medical situations can be complex, so professional medical consultation is always recommended.",
  },
  {
    id: "app-4",
    category: "About ContraSafe",
    question: "Is my personal information secure?",
    answer:
      "Yes, ContraSafe takes your privacy seriously. Your health information is stored securely on your device and is never shared without your explicit consent. We follow best practices for data protection and privacy.",
  },

  // General Contraception FAQs
  {
    id: "general-1",
    category: "General Contraception",
    question: "What's the difference between hormonal and non-hormonal methods?",
    answer:
      "Hormonal methods contain synthetic hormones (estrogen and/or progestin) that prevent pregnancy by stopping ovulation or changing cervical mucus. Non-hormonal methods work through physical barriers, copper ions, or natural family planning techniques.",
  },
  {
    id: "general-2",
    category: "General Contraception",
    question: "Which contraceptive method is most effective?",
    answer:
      "IUDs (both copper and hormonal) and implants are among the most effective methods, with over 99% effectiveness. Sterilization is also highly effective but is permanent. The 'best' method depends on your individual health profile, lifestyle, and preferences.",
  },
  {
    id: "general-3",
    category: "General Contraception",
    question: "Can I use contraceptives if I'm breastfeeding?",
    answer:
      "Yes, but method choice depends on timing after birth and breastfeeding status. Progestin-only methods (like the mini-pill, implant, or copper IUD) are generally preferred. Combined hormonal methods may affect milk supply.",
  },
  {
    id: "general-4",
    category: "General Contraception",
    question: "Do contraceptives protect against STIs?",
    answer:
      "Only barrier methods like condoms provide protection against sexually transmitted infections (STIs). Most other contraceptive methods do not protect against STIs, so additional protection may be needed.",
  },

  // Method-specific FAQs
  {
    id: "methods-1",
    category: "Specific Methods",
    question: "How long does it take for fertility to return after stopping contraceptives?",
    answer:
      "For most methods (pills, patches, rings, IUDs, implants), fertility typically returns within 1-3 months. The DMPA injection may take 12-18 months for fertility to return. Sterilization is considered permanent.",
  },
  {
    id: "methods-2",
    category: "Specific Methods",
    question: "What should I do if I miss a birth control pill?",
    answer:
      "Take the missed pill as soon as you remember. If you remember the next day, take both pills. If you miss 2+ pills, use backup contraception for 7 days and consider emergency contraception if you've had recent unprotected sex. Consult your healthcare provider.",
  },
  {
    id: "methods-3",
    category: "Specific Methods",
    question: "Are IUDs painful to insert?",
    answer:
      "IUD insertion may cause discomfort similar to strong menstrual cramps, but it's brief (usually 1-2 minutes). Your healthcare provider may recommend pain medication before the procedure. The discomfort varies between individuals.",
  },
  {
    id: "methods-4",
    category: "Specific Methods",
    question: "Can I get pregnant immediately after stopping contraceptives?",
    answer:
      "Yes, for most methods, pregnancy is possible immediately after stopping. The exception is the DMPA injection, where fertility may take longer to return. If you want to avoid pregnancy, start a new method before stopping your current one.",
  },

  // Safety & Side Effects
  {
    id: "safety-1",
    category: "Safety & Side Effects",
    question: "What are common side effects of hormonal contraceptives?",
    answer:
      "Common side effects may include: irregular bleeding (especially in first 3 months), nausea, breast tenderness, headaches, and mood changes. Most side effects improve after 2-3 months as your body adjusts.",
  },
  {
    id: "safety-2",
    category: "Safety & Side Effects",
    question: "Who should avoid hormonal contraceptives?",
    answer:
      "People with history of blood clots, certain cancers, severe liver disease, unexplained vaginal bleeding, or migraine with aura may need to avoid hormonal methods. Your healthcare provider will assess your individual risk factors.",
  },
  {
    id: "safety-3",
    category: "Safety & Side Effects",
    question: "Can contraceptives affect my future fertility?",
    answer:
      "No, using contraceptives does not permanently affect your ability to get pregnant in the future. Fertility typically returns to baseline levels after stopping contraception (except for DMPA, which may take longer).",
  },
  {
    id: "safety-4",
    category: "Safety & Side Effects",
    question: "What should I do if I experience severe side effects?",
    answer:
      "Contact your healthcare provider immediately if you experience: severe abdominal pain, chest pain, severe headaches, leg pain/swelling, vision changes, or signs of severe allergic reaction. These could indicate serious complications requiring immediate attention.",
  },

  // Emergency & Backup
  {
    id: "emergency-1",
    category: "Emergency & Backup",
    question: "What is emergency contraception and when should I use it?",
    answer:
      "Emergency contraception can prevent pregnancy after unprotected sex or contraceptive failure. It's most effective when taken as soon as possible, ideally within 72 hours (for some types, up to 120 hours). Consult a healthcare provider or pharmacist for options.",
  },
  {
    id: "emergency-2",
    category: "Emergency & Backup",
    question: "When should I use backup contraception?",
    answer:
      "Use backup contraception when: starting a new hormonal method (first 7 days), missing pills, late for injection, ring/patch displacement, during antibiotic use (some medications), or any time your primary method might be compromised.",
  },
];

export default function FAQsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const categories = [...new Set(faqs.map((faq) => faq.category))];

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "About ContraSafe":
        return "#e3f2fd";
      case "General Contraception":
        return "#e8f5e8";
      case "Specific Methods":
        return "#fff3e0";
      case "Safety & Side Effects":
        return "#ffebee";
      case "Emergency & Backup":
        return "#f3e5f5";
      default:
        return "#f5f5f5";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "About ContraSafe":
        return "📱";
      case "General Contraception":
        return "💊";
      case "Specific Methods":
        return "🔍";
      case "Safety & Side Effects":
        return "⚠️";
      case "Emergency & Backup":
        return "🚨";
      default:
        return "❓";
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            Frequently Asked Questions
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Find answers to common questions about contraceptive methods and ContraSafe
          </Text>
        </Card.Content>
      </Card>

      {/* Search */}
      <Card style={styles.searchCard}>
        <Card.Content>
          <Searchbar
            placeholder="Search FAQs..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
          />
        </Card.Content>
      </Card>

      {/* Search Results or Categories */}
      {searchQuery ? (
        <Card style={styles.resultsCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.resultsTitle}>
              Search Results ({filteredFAQs.length})
            </Text>
            <Divider style={styles.divider} />

            {filteredFAQs.length === 0 ? (
              <Text variant="bodyMedium" style={styles.noResults}>
                No FAQs found matching your search. Try different keywords or browse by category
                below.
              </Text>
            ) : (
              <List.Section>
                {filteredFAQs.map((faq) => (
                  <List.Accordion
                    key={faq.id}
                    title={faq.question}
                    titleStyle={styles.questionTitle}
                    expanded={expandedItems.includes(faq.id)}
                    onPress={() => toggleExpanded(faq.id)}
                    left={() => (
                      <Text style={styles.categoryIcon}>{getCategoryIcon(faq.category)}</Text>
                    )}
                    style={[styles.accordion, { backgroundColor: getCategoryColor(faq.category) }]}
                  >
                    <View style={styles.answerContainer}>
                      <Text variant="bodyMedium" style={styles.answerText}>
                        {faq.answer}
                      </Text>
                      <Text variant="bodySmall" style={styles.categoryTag}>
                        Category: {faq.category}
                      </Text>
                    </View>
                  </List.Accordion>
                ))}
              </List.Section>
            )}
          </Card.Content>
        </Card>
      ) : (
        <>
          {categories.map((category) => {
            const categoryFAQs = faqs.filter((faq) => faq.category === category);
            return (
              <Card key={category} style={styles.categoryCard}>
                <Card.Content>
                  <View style={styles.categoryHeader}>
                    <Text style={styles.categoryIconLarge}>{getCategoryIcon(category)}</Text>
                    <Text variant="titleLarge" style={styles.categoryTitle}>
                      {category}
                    </Text>
                  </View>
                  <Divider style={styles.divider} />

                  <List.Section>
                    {categoryFAQs.map((faq) => (
                      <List.Accordion
                        key={faq.id}
                        title={faq.question}
                        titleStyle={styles.questionTitle}
                        expanded={expandedItems.includes(faq.id)}
                        onPress={() => toggleExpanded(faq.id)}
                        style={[styles.accordion, { backgroundColor: getCategoryColor(category) }]}
                      >
                        <View style={styles.answerContainer}>
                          <Text variant="bodyMedium" style={styles.answerText}>
                            {faq.answer}
                          </Text>
                        </View>
                      </List.Accordion>
                    ))}
                  </List.Section>
                </Card.Content>
              </Card>
            );
          })}
        </>
      )}

      {/* Need More Help */}
      <Card style={styles.helpCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.helpTitle}>
            Still Have Questions?
          </Text>
          <Text variant="bodyMedium" style={styles.helpText}>
            If you can't find the answer you're looking for:
          </Text>
          <View style={styles.helpOptions}>
            <Text variant="bodyMedium" style={styles.helpOption}>
              • Consult with a qualified healthcare provider
            </Text>
            <Text variant="bodyMedium" style={styles.helpOption}>
              • Check the "Know Your Contraceptive" section for detailed method information
            </Text>
            <Text variant="bodyMedium" style={styles.helpOption}>
              • Use the comparison tool to compare different methods
            </Text>
            <Text variant="bodyMedium" style={styles.helpOption}>
              • Review WHO guidelines and official medical resources
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Disclaimer */}
      <Surface style={styles.disclaimerSurface}>
        <Text variant="bodySmall" style={styles.disclaimerText}>
          <Text style={{ fontWeight: "bold" }}>Medical Disclaimer: </Text>
          This information is only for learning. It does not replace medical advice. Always talk to a qualified healthcare provider about your contraceptive and reproductive health needs.
        </Text>
      </Surface>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#e3f2fd",
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
    color: "#1976d2",
  },
  subtitle: {
    textAlign: "center",
    color: "#1565c0",
    lineHeight: 20,
  },
  searchCard: {
    margin: 16,
    marginBottom: 8,
  },
  searchBar: {
    elevation: 0,
    backgroundColor: "#f8f9fa",
  },
  resultsCard: {
    margin: 16,
    marginBottom: 8,
  },
  resultsTitle: {
    fontWeight: "bold",
    color: "#2e7d32",
  },
  divider: {
    marginVertical: 12,
  },
  noResults: {
    textAlign: "center",
    color: "#666",
    fontStyle: "italic",
    marginVertical: 20,
  },
  categoryCard: {
    margin: 16,
    marginBottom: 8,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryIconLarge: {
    fontSize: 28,
    marginRight: 12,
  },
  categoryTitle: {
    fontWeight: "bold",
    color: "#2e7d32",
  },
  categoryIcon: {
    fontSize: 18,
    marginLeft: 16,
  },
  accordion: {
    marginBottom: 4,
    borderRadius: 8,
  },
  questionTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  answerContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 4,
  },
  answerText: {
    lineHeight: 20,
    color: "#333",
    marginBottom: 8,
  },
  categoryTag: {
    color: "#666",
    fontStyle: "italic",
  },
  helpCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: "#f0f4ff",
  },
  helpTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1976d2",
  },
  helpText: {
    marginBottom: 12,
    color: "#333",
  },
  helpOptions: {
    gap: 6,
  },
  helpOption: {
    color: "#666",
    lineHeight: 18,
  },
  disclaimerSurface: {
    margin: 16,
    padding: 12,
    backgroundColor: "#fff3e0",
    borderRadius: 8,
    elevation: 1,
  },
  disclaimerText: {
    lineHeight: 18,
    color: "#e65100",
  },
});
